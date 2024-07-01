import { usePreservedState } from 'hooks/usePreservedState';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { useCallback, useRef } from 'react';

export function useScrollTo(autoScrollOptions?: ScrollToOptions): {
  ref: React.MutableRefObject<Window | null>;
  scrollTo: (scrollToOptions?: ScrollToOptions) => void;
};

export function useScrollTo<T extends HTMLElement>(
  autoScrollOptions?: ScrollToOptions
): {
  ref: React.MutableRefObject<T | null>;
  scrollTo: (scrollToOptions?: ScrollToOptions) => void;
};

export function useScrollTo<T extends HTMLElement>(
  autoScrollOptions?: ScrollToOptions
) {
  const preservedAutoScrollOptions = usePreservedState(autoScrollOptions);
  const ref = useRef<T | Window | null>(null);

  const scrollTo = useCallback((scrollToOptions: ScrollToOptions = {}) => {
    const { left = 0, top = 0, behavior = 'auto' } = scrollToOptions;
    const targetElement = ref.current as T | Window;

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
      const {
        left = 0,
        top = 0,
        behavior = 'auto',
      } = preservedAutoScrollOptions;
      scrollTo({ left, top, behavior });
    }
  }, [preservedAutoScrollOptions, scrollTo]);

  return { ref, scrollTo };
}
