import { useCallback, useState } from 'react';
import { useDebounce } from '../useDebounce';
import { useEventListener } from '../../hooks/useEventListener';
import { isServer } from '@modern-kit/utils';

interface WindowSize {
  width: number | null;
  height: number | null;
}

interface useWindowSizeProps {
  debounceWait?: number;
}

const initialSize = {
  width: null,
  height: null,
};

export function useWindowSize({ debounceWait }: useWindowSizeProps = {}) {
  const [windowSize, setWindowSize] = useState<WindowSize>(() => {
    if (isServer()) return initialSize;

    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  const debouncedResize = useDebounce(setWindowSize, debounceWait);

  const handleResize = useCallback(() => {
    const setSize = debounceWait ? debouncedResize : setWindowSize;

    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, [debounceWait, debouncedResize]);

  useEventListener(window, 'resize', handleResize);

  return windowSize;
}
