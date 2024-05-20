import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
import { usePreservedCallback } from '../usePreservedCallback';
import { useRef } from 'react';
import { KeyDownCallbackMap } from './keyDownCallbackMap';
import { isFunction } from '@modern-kit/utils';

interface UseKeyDownProps {
  autoFocus?: boolean;
  keyDownCallbackMap?: Partial<KeyDownCallbackMap>;
  allKeyDownCallback?: (event: KeyboardEvent) => void;
}

export const useKeyDown = <T extends HTMLElement>({
  autoFocus = false,
  keyDownCallbackMap = {},
  allKeyDownCallback,
}: UseKeyDownProps) => {
  const ref = useRef<T>(null);

  const onKeyDown = usePreservedCallback((event: KeyboardEvent) => {
    if (allKeyDownCallback) {
      allKeyDownCallback(event);
      return;
    }

    const callback = keyDownCallbackMap[event.key];

    if (isFunction(callback)) {
      callback(event);
    }
    event.stopPropagation();
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
