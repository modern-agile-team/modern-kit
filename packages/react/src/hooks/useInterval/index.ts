import { usePreservedCallback } from '../usePreservedCallback';
import { useEffect } from 'react';

type SetIntervalParameters = Parameters<typeof setInterval>;

export const useInterval = (
  callback: SetIntervalParameters[0],
  delay?: SetIntervalParameters[1]
) => {
  const callbackAction = usePreservedCallback(callback);

  useEffect(() => {
    if (delay == null) {
      return;
    }

    const intervalId = window.setInterval(callbackAction, delay);

    return () => clearInterval(intervalId);
  }, [callbackAction, delay]);
};
