import { isNumber } from '@modern-kit/utils';
import { usePreservedCallback } from '../usePreservedCallback';
import { useEffect } from 'react';

type SetIntervalParameters = Parameters<typeof setInterval>;

type IntervalOptions =
  | number
  | { delay: SetIntervalParameters[1]; enabled?: boolean };

export const useInterval = (
  callback: SetIntervalParameters[0],
  options: IntervalOptions
) => {
  const delay = isNumber(options) ? options : options.delay;
  const enabled = isNumber(options) ? true : options?.enabled ?? true;

  const callbackAction = usePreservedCallback(callback);

  useEffect(() => {
    if (delay == null) return;

    const intervalId = window.setInterval(() => {
      if (!enabled) {
        clearInterval(intervalId);
      } else {
        callbackAction();
      }
    }, delay);

    return () => clearInterval(intervalId);
  }, [callbackAction, enabled, delay]);
};
