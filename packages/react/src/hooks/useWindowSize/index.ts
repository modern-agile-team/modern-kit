import { useCallback, useMemo, useState } from 'react';
import { useDebounce } from '../useDebounce';
import { usePreservedCallback } from '../usePreservedCallback';
import { useEventListener } from '../../hooks/useEventListener';

interface WindowSize {
  width: number | null;
  height: number | null;
}

interface useWindowSizeProps {
  isDebounce?: boolean;
  wait?: number;
}

export function useWindowSize(options: useWindowSizeProps = {}) {
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

  useEventListener(window, 'resize', handleResize, {
    beforeListenerAction: onResize,
  });

  return windowSize;
}
