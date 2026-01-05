import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { useCallback, useRef } from 'react';
import { StorageManager, isWindow } from '@modern-kit/utils';
import {
  cleanupOldScrollData,
  getHistoryKey,
} from './useScrollRestoration.utils';
import { useEventListener } from '../useEventListener';
import { usePreventBrowserScrollRestoration } from '../usePreventBrowserScrollRestoration';

interface UseScrollRestorationOptions {
  enabled?: boolean;
  behavior?: ScrollOptions['behavior'];
}

interface UseScrollRestorationReturnType<T extends HTMLElement> {
  ref: React.RefObject<T>;
}

const STORAGE_KEY = '@modern-kit/scroll-restoration';
const MAX_RETRY_COUNT = 5;
const MAX_ENTRIES = 50;
const RETRY_TIME_INTERVAL = 100;

const sessionStorage = new StorageManager<{
  [STORAGE_KEY]: Record<string, number>;
}>('sessionStorage');

export function useScrollRestoration<T extends HTMLElement>({
  enabled = true,
  behavior = 'instant',
}: UseScrollRestorationOptions = {}): UseScrollRestorationReturnType<T> {
  const isRestoredRef = useRef(false);

  const ref = useRef<T | null>(null);
  const historyKeyRef = useRef<string>('');
  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetRetry = useCallback(() => {
    retryCountRef.current = 0;

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
    retryTimeoutRef.current = null;
  }, []);

  const ensureHistoryKey = useCallback((force = false) => {
    if (force || !historyKeyRef.current) {
      historyKeyRef.current = getHistoryKey();
    }
  }, []);

  const saveScrollPosition = useCallback(() => {
    const historyKey = historyKeyRef.current;
    if (!historyKey) return;

    const scrollTarget = ref.current || window;
    const currentPos = isWindow(scrollTarget)
      ? window.scrollY
      : scrollTarget.scrollTop;

    const prevStorageMap = sessionStorage.getItem(STORAGE_KEY) || {};
    const cleanedMap = cleanupOldScrollData(prevStorageMap, MAX_ENTRIES);

    sessionStorage.setItem(STORAGE_KEY, {
      ...cleanedMap,
      [historyKey]: currentPos,
    });
  }, []);

  const getCurrentScrollHeight = useCallback(() => {
    const scrollTarget = ref.current || window;
    return isWindow(scrollTarget)
      ? document.documentElement.scrollHeight
      : scrollTarget.scrollHeight;
  }, []);

  const executeScroll = useCallback(
    (position: number) => {
      const scrollTarget = ref.current || window;
      const scrollToOptions: ScrollToOptions = {
        top: position,
        behavior,
      };

      if (isWindow(scrollTarget)) {
        window.scrollTo(scrollToOptions);
      } else {
        scrollTarget.scrollTo(scrollToOptions);
      }
    },
    [behavior]
  );

  const getSavedPosition = useCallback(() => {
    const storageMap = sessionStorage.getItem(STORAGE_KEY);
    if (!storageMap) return null;

    return storageMap[historyKeyRef.current] ?? null;
  }, []);

  const restoreScrollPosition = useCallback(() => {
    const scheduleRetry = () => {
      if (retryCountRef.current >= MAX_RETRY_COUNT) {
        resetRetry();
        return;
      }

      retryCountRef.current++;

      // 지수 백오프
      const delay =
        RETRY_TIME_INTERVAL * Math.pow(2, retryCountRef.current - 1);

      retryTimeoutRef.current = setTimeout(restoreScrollPosition, delay);
    };

    if (!enabled || isRestoredRef.current) {
      resetRetry();
      return;
    }

    ensureHistoryKey();
    const savedPos = getSavedPosition();

    if (savedPos == null) {
      resetRetry();
      return;
    }
    const currentScrollHeight = getCurrentScrollHeight();

    if (currentScrollHeight >= savedPos) {
      executeScroll(savedPos);
      isRestoredRef.current = true;
      resetRetry();
    } else {
      scheduleRetry();
    }
  }, [
    enabled,
    getSavedPosition,
    ensureHistoryKey,
    resetRetry,
    getCurrentScrollHeight,
    executeScroll,
  ]);

  useIsomorphicLayoutEffect(() => {
    restoreScrollPosition();

    return () => {
      saveScrollPosition();
      resetRetry();
    };
  }, [saveScrollPosition, resetRetry, restoreScrollPosition]);

  const saveWindow = typeof window !== 'undefined' ? window : null;

  useEventListener(saveWindow, 'popstate', () => {
    saveScrollPosition();

    ensureHistoryKey(true);
    isRestoredRef.current = false;

    restoreScrollPosition();
  });

  usePreventBrowserScrollRestoration();

  return { ref };
}
