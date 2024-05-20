import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { usePreservedCallback } from '../usePreservedCallback';
import { useRef } from 'react';

interface UseKeyDownProps {
  autoFocus?: boolean;
  keyDownCallbackMap?: Record<string, (event: KeyboardEvent) => void>;
  allKeyDownCallback?: (event: KeyboardEvent) => void;
}

export const useKeyDown = <T extends HTMLElement>({
  autoFocus = false,
  keyDownCallbackMap = {},
  allKeyDownCallback,
}: UseKeyDownProps) => {
  const ref = useRef<T>(null);

  const onKeyDown = usePreservedCallback((event: KeyboardEvent) => {
    try {
      if (allKeyDownCallback) {
        allKeyDownCallback(event);
        return;
      }

      const callback = keyDownCallbackMap[event.key];
      callback(event);
      event.stopPropagation();
    } catch (err: any) {
      console.error(
        `Failed to call the onKeyDown function. message: ${err.message}`
      );
    }
  });

  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    if (autoFocus) {
      element.focus();
    }

    element.addEventListener('keydown', onKeyDown);

    return () => element.addEventListener('keydown', onKeyDown);
  }, [autoFocus, onKeyDown]);

  return { ref };
};
