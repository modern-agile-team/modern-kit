import React, { useCallback, useRef } from 'react';
import {
  ScrollToElementOptions,
  getRelativePosition,
} from './useScrollTo.utils';

interface UseScrollToReturnType<T extends HTMLElement> {
  containerRef: React.RefObject<T | null>;
  scrollToPosition: (scrollToOptions?: ScrollToOptions) => void;
  scrollToElement: <E extends HTMLElement>(
    target: E,
    scrollToElementOptions?: ScrollToElementOptions
  ) => void;
}

/**
 * @description 스크롤 기능을 제공하는 커스텀 훅입니다.
 *
 * 훅이 반환하는 `containerRef`를 특정 엘리먼트에 할당하면 해당 컨테이너 요소를 스크롤 합니다.
 * 만약, `containerRef`를 할당하지 않으면 기본적으로 `window`를 스크롤합니다.
 *
 * @template T - 스크롤이 이루어질 컨테이너 요소의 타입입니다.
 * @returns {UseScrollToReturnType<T>} 스크롤 요소를 지정 할 `containerRef`와 스크롤을 동작 시킬 `scrollToPosition`, `scrollToElement` 함수를 포함하는 객체입니다.
 * - `containerRef`: 스크롤을 제어할 컨테이너 요소에 대한 ref입니다. 설정하지 않으면 `window`가 기본값으로 설정됩니다.
 * - `scrollToPosition`: scrollTo와 유사한 지정된 좌표로 스크롤을 이동시키는 함수입니다. `ScrollToOptions`을 매개변수로 받습니다.
 * - `scrollToElement`: scrollIntoView와 유사한 지정된 요소로 스크롤을 이동시키는 함수입니다. `target` 요소와 `ScrollToElementOptions`을 매개변수로 받습니다.
 *
 * @example
 * ```tsx
 * // scrollToPosition를 사용하면 top, left와 같은 포지션 값을 기준으로 이동합니다.
 * const { containerRef, scrollToPosition } = useScrollTo<HTMLDivElement>();
 *
 * scrollToPosition({
 *  top: 300,
 *  left: 300,
 *  behavior: 'smooth'
 * });
 *
 * <div ref={containerRef}>{...}</div>
 * //containerRef를 할당하지 않으면 window를 기반으로, 할당하면 해당 container를 기반으로 스크롤 합니다.
 * ```
 *
 * @example
 * ```tsx
 * // scrollToElement를 사용하면 첫 번째 인자로 넣은 타겟을 기준으로 스크롤합니다.
 * const target = useRef<HTMLDivElement | null>(null);
 * const { containerRef, scrollToElement } = useScrollTo<HTMLDivElement>();
 *
 * scrollToElement(target.current, {
 *  offsetX: 300,
 *  offsetY: 300,
 *  alignY: 'start', // 세로 정렬, 'start' | 'center' | 'end'
 *  alignX: 'start', // 가로 정렬, 'start' | 'center' | 'end'
 *  behavior: 'smooth'
 * });
 *
 * <div ref={containerRef}>{...}</div>
 * //containerRef를 할당하지 않으면 window를 기반으로, 할당하면 해당 container를 기반으로 스크롤 합니다.
 * ```
 */
export function useScrollTo<T extends HTMLElement>(): UseScrollToReturnType<T> {
  const containerRef = useRef<T>(null);

  /**
   * @description scrollTo와 유사하게 동작합니다. containerRef를 할당하지 않으면 window를 기반으로 스크롤합니다.
   */
  const scrollToPosition = useCallback(
    (scrollToOptions: ScrollToOptions = {}) => {
      const { left = 0, top = 0, behavior = 'auto' } = scrollToOptions;

      const scrollElement = containerRef.current ?? window;

      requestAnimationFrame(() => {
        scrollElement.scrollTo({
          left,
          top,
          behavior,
        });
      });
    },
    []
  );

  /**
   * @description scrollIntoView와 유사하게 동작하지만, alignX/Y, offset을 옵션을 받을 수 있습니다.
   */
  const scrollToElement = useCallback(
    <E extends HTMLElement>(
      target: E,
      scrollToElementOptions: ScrollToElementOptions = {}
    ) => {
      if (!target) return;

      const scrollElement = containerRef.current ?? window;
      const { behavior = 'auto' } = scrollToElementOptions;

      const { left, top } = getRelativePosition(
        scrollElement,
        target,
        scrollToElementOptions
      );

      requestAnimationFrame(() => {
        scrollElement.scrollTo({
          top,
          left,
          behavior,
        });
      });
    },
    []
  );

  return { containerRef, scrollToPosition, scrollToElement };
}
