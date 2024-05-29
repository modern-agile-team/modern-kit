import { useCallback, useEffect, useState } from 'react';
import { isNumber } from '@modern-kit/utils';
import { usePreservedCallback } from '../usePreservedCallback';
import { usePreservedState } from '../usePreservedState';

type SetIntervalParameters = Parameters<typeof setInterval>;

type IntervalOptions =
  | number
  | { delay: SetIntervalParameters[1]; enabled?: boolean };

export const useInterval = (
  callback: SetIntervalParameters[0],
  options: IntervalOptions
) => {
  const preservedOptions = usePreservedState(options);
  const callbackAction = usePreservedCallback(callback);

  const isNumberOptions = isNumber(preservedOptions);
  const delay = isNumberOptions ? preservedOptions : preservedOptions.delay;

  const [enabled, setEnabled] = useState(() =>
    isNumberOptions ? true : preservedOptions?.enabled ?? true
  );

  const startInterval = useCallback(() => {
    setEnabled(true);
  }, []);

  const stopInterval = useCallback(() => {
    setEnabled(false);
  }, []);

  useEffect(() => {
    if (!isNumberOptions) {
      setEnabled(preservedOptions?.enabled ?? true);
    }
  }, [isNumberOptions, preservedOptions]);

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

  return { isActing: enabled, start: startInterval, stop: stopInterval };
};
