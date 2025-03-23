import { usePreservedCallback } from 'hooks/usePreservedCallback';
import { useRef } from 'react';

export function useCallbackOnce<F extends (...args: any[]) => void>(
  callback: F
) {
  const hasFired = useRef(false);
  const preservedCallback = usePreservedCallback(callback);

  return (...args: Parameters<F>) => {
    if (hasFired.current) return;

    preservedCallback(...args);
    hasFired.current = true;
  };
}
