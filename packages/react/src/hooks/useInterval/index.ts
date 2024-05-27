import { usePreservedCallback } from '../usePreservedCallback';
import { useEffect } from 'react';

type SetIntervalParameters = Parameters<typeof setInterval>;

interface UseIntervalOptions {
  enabled?: boolean;
}

export const useInterval = (
  callback: SetIntervalParameters[0],
  delay?: SetIntervalParameters[1],
  options: UseIntervalOptions = {}
) => {
  const { enabled = true } = options;

  const callbackAction = usePreservedCallback(callback);

  useEffect(() => {
    if (delay == null) return;

    const intervalId = window.setInterval(() => {
      if (!enabled) clearInterval(intervalId);
      callbackAction();
    }, delay);

    return () => clearInterval(intervalId);
  }, [callbackAction, enabled, delay]);
};
