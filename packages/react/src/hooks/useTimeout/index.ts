import { usePreservedCallback } from '../usePreservedCallback';
import { useEffect } from 'react';

type SetTimeoutParameters = Parameters<typeof setTimeout>;

export const useTimeout = (
  callback: SetTimeoutParameters[0],
  delay?: SetTimeoutParameters[1]
) => {
  const callbackAction = usePreservedCallback(callback);

  useEffect(() => {
    if (delay == null) {
      return;
    }

    const timeoutId = window.setTimeout(callbackAction, delay);

    return () => clearTimeout(timeoutId);
  }, [callbackAction, delay]);
};
