import { isNumber } from '@modern-kit/utils';

export interface TimeoutOptions {
  delay: number;
  enabled?: boolean;
}

export const getTimeoutOptions = (options: number | TimeoutOptions) => {
  return isNumber(options)
    ? { delay: options, enabled: true }
    : {
        delay: options.delay,
        enabled: options?.enabled ?? true,
      };
};
