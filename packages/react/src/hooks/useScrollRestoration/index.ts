import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { useRef } from 'react';
import { StorageManager, isWindow } from '@modern-kit/utils';
import { getHistoryKey } from './useScrollRestoration.utils';

interface UseScrollRestorationProps {
  enabled?: boolean;
}
interface UseScrollRestorationReturnType<T extends HTMLElement> {
  ref: React.RefObject<T>;
}
type ScrollStorageMap = Record<string, number>;
const STORAGE_KEY = '__modern_kit_scroll_restoration_map__';
/**
 * @description 브라우저의 뒤로가기/앞으로가기 시 스크롤 위치를 저장하고 복원하는 커스텀 훅입니다.
 *
 * 기본적으로 브라우저의 `history.scrollRestoration`을 'manual'로 설정하여 수동으로 제어합니다.
 * `ref`를 특정 엘리먼트에 할당하면 해당 요소의 스크롤을 복원하고, 할당하지 않으면 `window`의 스크롤을 복원합니다.
 *
 * @template T - 스크롤이 이루어질 컨테이너 요소의 타입입니다.
 * @param {UseScrollRestorationProps} props - 스크롤 복원 옵션입니다.
 * @returns {UseScrollRestorationReturnType<T>} 스크롤 요소를 지정할 `ref`를 포함하는 객체입니다.
 *
 * @example
 * ```tsx
 * // 1. Window 스크롤 복원 (기본 사용)
 * useScrollRestoration();
 * * return <div>...</div>;
 * ```
 *
 * @example
 * ```tsx
 * // 2. 특정 컨테이너 요소 스크롤 복원
 * const { containerRef } = useScrollRestoration<HTMLDivElement>();
 *
 * return (
 * <div ref={ref} style={{ overflow: 'auto', height: '500px' }}>
 * {...content}
 * </div>
 * );
 * ```
 * * @example
 * ```tsx
 * // 3. 비동기 데이터 로딩 후 복원 (React Query 등과 함께 사용)
 * const { data, isLoading } = useQuery(...);
 * * // 데이터가 로드되어 높이가 확보된 후에 복원을 시도합니다.
 * useScrollRestoration({ enabled: !isLoading && !!data });
 * ```
 */
export const useScrollRestoration = <T extends HTMLElement>({
  enabled = true,
}: UseScrollRestorationProps = {}): UseScrollRestorationReturnType<T> => {
  const isRestoredRef = useRef(false);
  const ref = useRef<T | null>(null);
  const sessionStorage = new StorageManager<{
    [STORAGE_KEY]: ScrollStorageMap;
  }>('sessionStorage');
  const historyKeyRef = useRef<string>('');

  useIsomorphicLayoutEffect(() => {
    if ('scrollRestoration' in window.history) {
      const original = window.history.scrollRestoration;
      window.history.scrollRestoration = 'manual';
      return () => {
        window.history.scrollRestoration = original;
      };
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!historyKeyRef.current) {
      historyKeyRef.current = getHistoryKey();
    }
    const storageMap = sessionStorage.getItem(STORAGE_KEY);

    if (!enabled || isRestoredRef.current || !storageMap) return;

    const historyKey = historyKeyRef.current;
    const savedPos = storageMap[historyKey];

    if (!savedPos) return;

    const scrollTarget = ref.current || window;
    const currentScrollHeight = isWindow(scrollTarget)
      ? document.documentElement.scrollHeight
      : scrollTarget.scrollHeight;

    if (currentScrollHeight >= savedPos) {
      const scrollToOptions: ScrollToOptions = {
        top: savedPos,
        behavior: 'instant',
      };

      if (isWindow(scrollTarget)) {
        window.scrollTo(scrollToOptions);
      } else {
        scrollTarget.scrollTo(scrollToOptions);
      }

      isRestoredRef.current = true;
    }
  }, [enabled]);

  useIsomorphicLayoutEffect(() => {
    return () => {
      const historyKey = historyKeyRef.current;
      if (!historyKey) return;

      const scrollTarget = ref.current || window;
      const currentPos = isWindow(scrollTarget)
        ? window.scrollY
        : scrollTarget.scrollTop;
      const prevStorageMap = sessionStorage.getItem(STORAGE_KEY);
      sessionStorage.setItem(STORAGE_KEY, {
        ...prevStorageMap,
        [historyKey]: currentPos,
      });
    };
  }, []);

  return { ref };
};
