import { usePreservedCallback } from '../usePreservedCallback';
import { useEffect, useRef } from 'react';

interface UseKeyDownProps {
  autoFocus?: boolean;
  keyDownCallbackMap: Record<string, (event: KeyboardEvent) => void>;
}

export const useKeyDown = <T extends HTMLElement>({
  autoFocus = false,
  keyDownCallbackMap,
}: UseKeyDownProps) => {
  const ref = useRef<T>(null);

  const onKeyDown = usePreservedCallback((event: KeyboardEvent) => {
    try {
      const callback = keyDownCallbackMap[event.key];
      callback(event);
      event.stopPropagation();
    } catch (err: any) {
      console.error(
        `Failed to call the onKeyDown function. message: ${err.message}`
      );
    }
  });

  useEffect(() => {
    if (!ref.current) return;

    if (autoFocus) {
      ref.current.focus();
    }

    ref.current.addEventListener('keydown', onKeyDown);
  }, [autoFocus, onKeyDown]);

  return { ref };
};
