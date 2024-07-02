import { usePreservedState } from '../usePreservedState';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { useCallback, useRef } from 'react';

export function useScrollTo(autoScrollOptions?: ScrollToOptions): {
  ref: React.MutableRefObject<Window | null>;
  scrollTo: (scrollToOptions?: ScrollToOptions) => void;
};

export function useScrollTo<T extends HTMLElement>(
  autoScrollOptions?: ScrollToOptions
): {
  ref: React.RefObject<T>;
  scrollTo: (scrollToOptions?: ScrollToOptions) => void;
};

export function useScrollTo<T extends HTMLElement>(
  autoScrollOptions?: ScrollToOptions
) {
  const preservedAutoScrollOptions = usePreservedState(autoScrollOptions);
  const ref = useRef<T | Window | null>(null);

  const scrollTo = useCallback((scrollToOptions: ScrollToOptions = {}) => {
    if (!ref.current) return;

    const { left = 0, top = 0, behavior = 'auto' } = scrollToOptions;
    const targetElement = ref.current;

    targetElement.scrollTo({
      left,
      top,
      behavior,
    });
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) {
      ref.current = window;
    }

    if (preservedAutoScrollOptions) {
      scrollTo(preservedAutoScrollOptions);
    }
  }, [preservedAutoScrollOptions, scrollTo]);

  return { ref, scrollTo };
}
