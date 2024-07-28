import { useCallback, useEffect, useRef } from 'react';
import { ScrollToElementOptions, getRelativePosition } from './internal';

/**
 * @description 스크롤 기능을 제공하는 커스텀 훅입니다.
 * 훅이 반환하는 `containerRef`를 특정 엘리먼트에 할당하면 해당 요소를 스크롤 합니다.
 * `containerRef`를 할당하지 않으면 `window`를 스크롤합니다.
 *
 * @returns 스크롤 요소를 지정 할 `containerRef`와 스크롤을 동작 시킬 `scrollToPosition`, `scrollToElement` 함수를 포함하는 객체입니다.
 *
 * @example
 * // scrollToPosition를 사용하면 top, left와 같은 포지션 값을 기준으로 이동합니다.
 * const { containerRef, scrollToPosition } = useScrollTo();
 * scrollToPosition({ top, left, behavior });
 *
 * @example
 * // scrollToElement를 사용하면 인자로 넣은 엘리먼트를 기준으로 이동합니다.
 * const { containerRef, scrollToElement } = useScrollTo();
 * scrollToElement(target.current, { offsetX, offsetY });
 */
export function useScrollTo(): {
  containerRef: React.MutableRefObject<Window | null>;
  scrollToPosition: (scrollToOptions?: ScrollToOptions) => void;
  scrollToElement: <E extends HTMLElement>(
    target: E,
    scrollToElementOptions?: ScrollToElementOptions
  ) => void;
};

export function useScrollTo<T extends HTMLElement>(): {
  containerRef: React.RefObject<T>;
  scrollToPosition: (scrollToOptions?: ScrollToOptions) => void;
  scrollToElement: <E extends HTMLElement>(
    target: E,
    scrollToElementOptions?: ScrollToElementOptions
  ) => void;
};

export function useScrollTo<T extends HTMLElement>() {
  const containerRef = useRef<T | Window | null>(null);

  const scrollToPosition = useCallback(
    (scrollToOptions: ScrollToOptions = {}) => {
      if (!containerRef.current) return;

      const { left = 0, top = 0, behavior = 'auto' } = scrollToOptions;

      const scrollElement = containerRef.current;

      scrollElement.scrollTo({
        left,
        top,
        behavior,
      });
    },
    []
  );

  const scrollToElement = useCallback(
    <E extends HTMLElement>(
      target: E,
      scrollToElementOptions: ScrollToElementOptions = {}
    ) => {
      if (!containerRef.current) return;

      const scrollElement = containerRef.current;
      const { behavior = 'auto' } = scrollToElementOptions;

      const { left, top } = getRelativePosition(
        scrollElement,
        target,
        scrollToElementOptions
      );

      scrollElement.scrollTo({
        top,
        left,
        behavior,
      });
    },
    []
  );

  useEffect(() => {
    if (!containerRef.current) {
      containerRef.current = window;
    }
  }, []);

  return { containerRef, scrollToPosition, scrollToElement };
}
