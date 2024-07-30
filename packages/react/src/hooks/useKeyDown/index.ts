import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { usePreservedCallback } from '../usePreservedCallback';
import { useRef } from 'react';
import { KeyDownCallbackMap } from './keyDownCallbackMap';
import { isFunction } from '@modern-kit/utils';

interface UseKeyDownProps {
  enabled?: boolean;
  autoFocus?: boolean;
  keyDownCallbackMap?: Partial<KeyDownCallbackMap>;
  allKeyDownCallback?: (event: KeyboardEvent) => void;
}

export function useKeyDown<T extends HTMLElement>({
  enabled = true,
  autoFocus = false,
  keyDownCallbackMap = {},
  allKeyDownCallback,
}: UseKeyDownProps) {
  const ref = useRef<T>(null);

  const onKeyDown = usePreservedCallback((event: KeyboardEvent) => {
    try {
      if (allKeyDownCallback) {
        allKeyDownCallback(event);
        return;
      }

      const keyDownCallback = keyDownCallbackMap[event.key];

      if (isFunction(keyDownCallback)) {
        keyDownCallback(event);
      }
      event.stopPropagation();
    } catch (err: any) {
      console.error(
        `Failed to call the onKeyDown function. message: ${err.message}`
      );
    }
  });

  useIsomorphicLayoutEffect(() => {
    if (!ref.current || !enabled) return;

    const element = ref.current;

    if (autoFocus) {
      element.focus();
    }

    element.addEventListener('keydown', onKeyDown);

    return () => element.removeEventListener('keydown', onKeyDown);
  }, [enabled, autoFocus, onKeyDown]);

  return { ref };
}
