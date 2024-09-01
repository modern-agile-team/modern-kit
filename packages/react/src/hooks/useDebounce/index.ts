import { useMemo } from 'react';
import { debounce } from 'lodash-es';
import { useUnmount } from '../useUnMount';
import { usePreservedCallback } from '../../hooks/usePreservedCallback';
import { usePreservedState } from '../../hooks/usePreservedState';

export type DebounceParameters = Parameters<typeof debounce>;

export function useDebounce(
  callback: DebounceParameters[0],
  wait: DebounceParameters[1],
  options: DebounceParameters[2] = {}
) {
  const callbackAction = usePreservedCallback(callback);
  const preservedOptions = usePreservedState(options);

  const debounced = useMemo(() => {
    return debounce(callbackAction, wait, preservedOptions);
  }, [callbackAction, wait, preservedOptions]);

  useUnmount(() => debounced.cancel());

  return debounced;
}
