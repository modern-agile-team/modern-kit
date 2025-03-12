import { useCallback, useRef, useState } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';
import { noop } from '@modern-kit/utils';

export interface UseIntersectionObserverProps extends IntersectionObserverInit {
  onIntersectStart?: (entry: IntersectionObserverEntry) => void;
  onIntersectEnd?: (entry: IntersectionObserverEntry) => void;
  calledOnce?: boolean;
  enabled?: boolean;
}

interface UseIntersectionObserverReturnType<T extends HTMLElement> {
  ref: React.RefCallback<T>;
  isIntersecting: boolean;
  hasIntersected: boolean;
}

/**
 * @description `useIntersectionObserver` 훅은 주어진 타겟 요소가 뷰포트(viewport) 내에 들어오거나 나가는지 관찰하기 위한 Intersection Observer를 설정합니다.
 *
 * 이 훅은 요소가 교차할 때 호출할 콜백을 제공하며, 한 번만 호출되거나 반복적으로 호출되도록 설정할 수 있습니다.
 *
 * @template T - 관찰할 HTML 요소 타입, 기본적으로 `HTMLElement`를 상속합니다.
 *
 * @param {(entry: IntersectionObserverEntry) => void} params.onIntersectStart - 타겟 요소가 viewport 내에 들어갈 때 호출되는 콜백 함수입니다.
 * @param {(entry: IntersectionObserverEntry) => void} params.onIntersectEnd - 타겟 요소가 viewport에서 나갈 때 호출되는 콜백 함수입니다.
 * @param {boolean} [params.enabled=true] - Observer를 활성화할지 여부를 나타냅니다. `false`일 경우 Observer가 작동하지 않습니다.
 * @param {boolean} [params.calledOnce=false] - 요소가 교차할 때 콜백을 `한 번`만 호출할지 여부를 나타냅니다.
 * @param {Element} [params.root=null] - 교차할 때 기준이 되는 root 요소입니다. 기본값은 `null`이며 이는 viewport를 의미합니다.
 * @param {number | number[]} [params.threshold=0] - Observer가 콜백을 호출하는 임계값을 나타냅니다.
 * @param {string} [params.rootMargin='0px 0px 0px 0px'] - 루트 요소에 대한 마진을 지정합니다. 이는 뷰포트 또는 루트 요소의 경계를 확장하거나 축소하는데 사용됩니다.
 *
 * @returns {UseIntersectionObserverReturnType<T>} ref를 포함한 isIntersecting과 hasIntersected 값을 반환합니다.
 * - `ref`: 관찰할 타겟 요소에 전달할 ref
 * - `isIntersecting`: 타겟 요소가 교차하는지 여부를 나타내는 boolean 값
 * - `hasIntersected`: 타겟 요소가 최초로 교차했는지 여부를 나타내는 boolean 값
 *
 * @example
 * ```tsx
 * const { ref: targetRef, isIntersecting, hasIntersected } = useIntersectionObserver<HTMLDivElement>({
 *   onIntersectStart: () => console.log('onIntersectStart'),
 *   onIntersectEnd: () => console.log('onIntersectEnd'),
 *   calledOnce: true,
 *   enabled: true,
 *   ...intersectionObserverOptions, // root, threshold, rootMargin
 * });
 *
 * <div ref={targetRef} />
 * ```
 */
export function useIntersectionObserver<T extends HTMLElement>({
  onIntersectStart = noop,
  onIntersectEnd = noop,
  enabled = true,
  calledOnce = false,
  root = null,
  threshold = 0,
  rootMargin = '0px 0px 0px 0px',
}: UseIntersectionObserverProps = {}): UseIntersectionObserverReturnType<T> {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);

  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const calledCount = useRef(0);

  const intersectionObserverCallback = usePreservedCallback(
    ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (!entry) return;

      const targetElement = entry.target as T;
      setIsIntersecting(entry.isIntersecting);

      if (entry.isIntersecting) {
        calledCount.current += 1;

        setHasIntersected(true);
        onIntersectStart(entry);
      } else if (isIntersecting) {
        // 최초 mount 시에 호출을 방지하고, 타겟 요소가 viewport에서 나갈 때만 호출
        calledCount.current += 1;

        onIntersectEnd(entry);
      }

      if (calledOnce && calledCount.current > 1) {
        observer.unobserve(targetElement);
      }
    }
  );

  const targetRef = useCallback(
    (node: T) => {
      // 기존 observer가 활성화된 상태에서 새로운 요소를 관찰하기 전에 기존 observer 관찰 중지하며, 메모리 누수를 방지
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
        intersectionObserverRef.current = null;
      }

      if (node == null || !enabled) return;

      intersectionObserverRef.current = new IntersectionObserver(
        intersectionObserverCallback,
        {
          threshold,
          root,
          rootMargin,
        }
      );
      intersectionObserverRef.current.observe(node);
    },
    [enabled, threshold, root, rootMargin, intersectionObserverCallback]
  );

  return { ref: targetRef, isIntersecting, hasIntersected };
}
