import { useEffect, useRef } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';
import { isMobile } from '@modern-kit/utils';

export const useOnClickOutside = <T extends HTMLElement>(
  action: (targetElement: T) => void
) => {
  const ref = useRef<T>(null);
  const callbackAction = usePreservedCallback(action);

  useEffect(() => {
    const eventType = isMobile() ? 'touchstart' : 'mousedown';

    const listener = ({ target }: MouseEvent | TouchEvent) => {
      const targetElement = ref.current;

      if (targetElement && !targetElement.contains(target as Node)) {
        callbackAction(targetElement);
      }
    };

    document.addEventListener(eventType, listener);

    return () => {
      document.removeEventListener(eventType, listener);
    };
  }, [callbackAction]);

  return { ref };
};
