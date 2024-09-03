import { isNumber } from '@modern-kit/utils';
import { type TimeoutOptions } from './useTimeout.types';

export const getTimeoutOptions = (options: number | TimeoutOptions) => {
  return isNumber(options)
    ? { delay: options, enabled: true }
    : {
        delay: options.delay,
        enabled: options?.enabled ?? true,
      };
};
