import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { useCallback, useRef } from 'react';

export function useScrollTo(autoScrollOptions?: ScrollToOptions): {
  ref: React.MutableRefObject<Window>;
  scrollTo: (scrollToOptions?: ScrollToOptions) => void;
};

export function useScrollTo<T extends HTMLElement>(
  autoScrollOptions?: ScrollToOptions
): {
  ref: React.MutableRefObject<T>;
  scrollTo: (scrollToOptions?: ScrollToOptions) => void;
};

export function useScrollTo<T extends HTMLElement>(
  autoScrollOptions?: ScrollToOptions
) {
  const ref = useRef<T | Window>(window);

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
    if (autoScrollOptions) {
      const { left = 0, top = 0, behavior = 'auto' } = autoScrollOptions;
      scrollTo({ left, top, behavior });
    }
  }, []);

  return { ref, scrollTo };
}
