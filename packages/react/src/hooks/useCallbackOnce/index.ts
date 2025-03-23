import { DependencyList, useCallback, useRef } from 'react';

export function useCallbackOnce<F extends (...args: any[]) => void>(
  callback: F,
  deps: DependencyList
) {
  const hasFired = useRef(false);
  const memoizedCallback = useCallback((...args: Parameters<F>) => {
    if (hasFired.current) {
      return;
    }

    callback(...args);
    hasFired.current = true;
  }, deps);

  return memoizedCallback;
}
