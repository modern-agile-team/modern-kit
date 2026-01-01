import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { useCallback, useRef } from 'react';
import { StorageManager, isWindow } from '@modern-kit/utils';
import {
  cleanupOldScrollData,
  getHistoryKey,
} from './useScrollRestoration.utils';
interface UseScrollRestorationOptions {
  enabled?: boolean;
  behavior?: ScrollOptions['behavior'];
}

interface UseScrollRestorationReturnType<T extends HTMLElement> {
  ref: React.RefObject<T>;
}

const STORAGE_KEY = '__modern_kit_scroll_restoration_map__';
const MAX_RETRY_COUNT = 3;
const MAX_ENTRIES = 50;
const RETRY_TIME_INTERVAL = 100;

const sessionStorage = new StorageManager<{
  [STORAGE_KEY]: Record<string, number>;
}>('sessionStorage');

export const useScrollRestoration = <T extends HTMLElement>({
  enabled = true,
  behavior = 'instant',
}: UseScrollRestorationOptions = {}): UseScrollRestorationReturnType<T> => {
  const isRestoredRef = useRef(false);

  const ref = useRef<T | null>(null);
  const historyKeyRef = useRef<string>('');
  const retryCountRef = useRef(0);
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // timeout 리셋
  const resetRetry = useCallback(() => {
    retryCountRef.current = 0;

    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
    retryTimeoutRef.current = null;
  }, []);

  // historyKey 처리 함수
  // force가 true이면 강제 처리
  const ensureHistoryKey = useCallback((force = false) => {
    if (force || !historyKeyRef.current) {
      historyKeyRef.current = getHistoryKey();
    }
  }, []);

  // 스크롤 저장 로직 분리
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

  // 현재 스크롤 높이 가져오기
  const getCurrentScrollHeight = useCallback(() => {
    const scrollTarget = ref.current || window;
    return isWindow(scrollTarget)
      ? document.documentElement.scrollHeight
      : scrollTarget.scrollHeight;
  }, []);

  // 실제 스크롤 실행
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

  // 저장된 스크롤 위치 가져오기
  const getSavedPosition = useCallback(() => {
    const storageMap = sessionStorage.getItem(STORAGE_KEY);
    if (!storageMap) return null;

    return storageMap[historyKeyRef.current] ?? null;
  }, []);

  // 스크롤 위치 복원
  const restoreScrollPosition = useCallback(() => {
    // retry 스케쥴링
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

    if (savedPos === null) {
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

  // 언마운트 시 현재 스크롤 위치를 저장하고, timeout 리셋
  useIsomorphicLayoutEffect(() => {
    restoreScrollPosition();

    return () => {
      saveScrollPosition();
      resetRetry();
    };
  }, [saveScrollPosition, resetRetry, restoreScrollPosition]);

  // popState 핸들러 등록
  useIsomorphicLayoutEffect(() => {
    const handlePopState = () => {
      saveScrollPosition();

      ensureHistoryKey(true);
      isRestoredRef.current = false;

      restoreScrollPosition();
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [ensureHistoryKey, saveScrollPosition, restoreScrollPosition]);

  useIsomorphicLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      const original = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = original;
      };
    }
  }, []);

  return { ref };
};
