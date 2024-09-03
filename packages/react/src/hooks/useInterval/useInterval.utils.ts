import { isNumber } from '@modern-kit/utils';
import { type IntervalOptions } from './useInterval.types';

export const getIntervalOptions = (options: number | IntervalOptions) => {
  return isNumber(options)
    ? { delay: options, enabled: true }
    : {
        delay: options.delay,
        enabled: options?.enabled ?? true,
      };
};
