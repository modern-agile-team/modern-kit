import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { useCallback, useRef } from 'react';
import { StorageManager, isWindow } from '@modern-kit/utils';
import {
  pruneScrollPositionMap,
  getHistoryKey,
} from './useScrollRestoration.utils';
import { usePreventBrowserScrollRestoration } from '../usePreventBrowserScrollRestoration';

interface UseScrollRestorationOptions {
  id?: string;
  enabled?: boolean;
  behavior?: ScrollOptions['behavior'];
}

interface UseScrollRestorationReturnType<T extends HTMLElement> {
  ref: React.RefObject<T>;
}

const STORAGE_KEY = 'mk-scroll-restoration';
const MAX_RETRY_COUNT = 5;
const MAX_ENTRIES = 50;
const RETRY_TIME_INTERVAL = 100;

const sessionStorage = new StorageManager<{
  [STORAGE_KEY]: Record<string, number>;
}>('sessionStorage');

/**
 * @description 브라우저 또는 특정 엘리먼트의 이전 스크롤 위치를 저장하고 복원하는 커스텀 훅입니다.
 *
 * @remarks
 * - 한 컴포넌트 내에서 여러 번 훅을 사용할 경우, 각 인스턴스를 구분하려면 `id` 옵션을 명시적으로 부여하세요.
 * - 별도의 `id`를 지정하지 않으면, `ref`가 있는 경우 `'element'`, 없는 경우는 `'window'`로 기본값이 설정됩니다.
 * - id를 부여하지 않은 경우, 중복 key로 인해 스크롤 복원 동작이 정상적으로 동작하지 않을 수 있으니 주의가 필요합니다.
 *
 * @remarks
 * - 스크롤 위치 저장은 새로고침, 페이지 이동(뒤로/앞으로가기), 훅의 언마운트 시점에 이루어집니다.
 * - 따라서, 컴포넌트가 언마운트되지 않고 유지되는 구조에서 해당 훅을 호출 시 스크롤 복원 동작이 정상적으로 동작하지 않을 수 있으니 주의가 필요합니다. (예: Layout 컴포넌트)
 *
 * @template T - 스크롤 복원 대상 엘리먼트 타입
 * @param {UseScrollRestorationOptions} options - 스크롤 복원 옵션
 * @param {string} options.id - 스크롤 복원 식별자 (다중 인스턴스 사용 시 필수)
 * @param {boolean} [options.enabled=true] - 스크롤 복원 활성화 여부
 * @param {ScrollOptions['behavior']} [options.behavior='instant'] - 스크롤 복원 동작 옵션
 * @returns {{ ref: React.RefObject<T> }} 스크롤 복원 대상 엘리먼트 ref 객체
 *
 * @example
 * ```ts
 * // window 스크롤 복원
 * useScrollRestoration();
 * ```
 *
 * @example
 * ```tsx
 * // 특정 엘리먼트 스크롤 복원
 * const { ref } = useScrollRestoration<HTMLDivElement>();
 * return <div ref={ref}>...</div>;
 * ```
 *
 * @example
 * ```ts
 * // 다중 인스턴스 스크롤 복원
 * useScrollRestoration();
 * const { ref: ref1 } = useScrollRestoration<HTMLDivElement>({ id: 'sidebar1' });
 * const { ref: ref2 } = useScrollRestoration<HTMLDivElement>({ id: 'sidebar2' });
 *
 * return (
 *   <div>
 *     <div ref={ref1}>...</div>
 *     <div ref={ref2}>...</div>
 *   </div>
 * );
 * ```
 */
export function useScrollRestoration<T extends HTMLElement>({
  id,
  enabled = true,
  behavior = 'instant',
}: UseScrollRestorationOptions = {}): UseScrollRestorationReturnType<T> {
  const ref = useRef<T | null>(null);
  const isRestoredRef = useRef(false);
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

  const getStorageKey = useCallback(() => {
    const historyKey = historyKeyRef.current;
    const instanceId = id ?? (ref.current ? 'element' : 'window');
    return `${historyKey}-${instanceId}`;
  }, [id]);

  const saveScrollPosition = useCallback(() => {
    if (!historyKeyRef?.current) return;

    const scrollTarget = ref.current || window;
    const currentPos = isWindow(scrollTarget)
      ? window.scrollY
      : scrollTarget.scrollTop;

    const prevStorageMap = sessionStorage.getItem(STORAGE_KEY) || {};
    const cleanedMap = pruneScrollPositionMap(prevStorageMap, MAX_ENTRIES);

    sessionStorage.setItem(STORAGE_KEY, {
      ...cleanedMap,
      [getStorageKey()]: currentPos,
    });
  }, [getStorageKey]);

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

    return storageMap[getStorageKey()] ?? null;
  }, [getStorageKey]);

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

  useIsomorphicLayoutEffect(() => {
    if (!enabled) return;

    const handleBeforeUnload = () => saveScrollPosition();
    const handlePopstate = () => {
      saveScrollPosition();

      ensureHistoryKey(true);
      isRestoredRef.current = false;

      restoreScrollPosition();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [saveScrollPosition, ensureHistoryKey, restoreScrollPosition, enabled]);

  usePreventBrowserScrollRestoration();

  return { ref };
}
