import { useCallback, useMemo, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { useDebounce } from '../useDebounce';
import { Nullable } from '@modern-kit/types';

interface WindowSize {
  width: Nullable<number>;
  height: Nullable<number>;
}

interface useWindowSizeProps {
  isDebounce?: boolean;
  wait?: number;
}

export const useWindowSize = (options: useWindowSizeProps = {}) => {
  const { isDebounce = false, wait = 300 } = options;
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: null,
    height: null,
  });

  const onResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  const debouncedResize = useDebounce(onResize, wait);

  const handleResize = useMemo(() => {
    return isDebounce ? debouncedResize : onResize;
  }, [onResize, isDebounce, debouncedResize]);

  useIsomorphicLayoutEffect(() => {
    onResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowSize;
};
