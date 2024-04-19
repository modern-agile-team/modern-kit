import { useMemo } from 'react';
import { debounce } from 'lodash-es';
import { useUnmount } from '../useUnMount';
import { usePreservedCallback } from '../../hooks/usePreservedCallback';

export type DebounceParameters = Parameters<typeof debounce>;

export const useDebounce = (
  callback: DebounceParameters[0],
  wait: DebounceParameters[1],
  options: DebounceParameters[2] = {}
) => {
  const callbackAction = usePreservedCallback(callback);

  const debounced = useMemo(() => {
    return debounce(callbackAction, wait, options);
  }, [callbackAction, wait, options]);

  useUnmount(() => debounced.cancel());

  return debounced;
};
