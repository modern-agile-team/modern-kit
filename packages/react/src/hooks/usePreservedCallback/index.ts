import { useCallback, useRef } from 'react';

export const usePreservedCallback = <T extends (...args: any[]) => any>(
  callback: T
) => {
  const callbackRef = useRef<T>(callback);

  callbackRef.current = callback;

  return useCallback((...args: any[]) => {
    return callbackRef.current(...args);
  }, []) as T;
};
