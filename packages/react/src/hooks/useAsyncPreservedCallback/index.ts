import { useCallback, useEffect, useRef } from 'react';

export const useAsyncPreservedCallback = <
  T extends (...args: any[]) => Promise<any>
>(
  callback: T
) => {
  const callbackRef = useRef<T>(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(async (...args: any[]) => {
    return await callbackRef.current(...args);
  }, []) as T;
};
