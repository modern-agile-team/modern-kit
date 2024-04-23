import { useEffect, useState } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';
import { deepEqual } from '@modern-kit/utils';

export const usePreservedState = <T>(
  value: T,
  comparator?: (source: T, target: T) => boolean
) => {
  const [preservedState, setPreservedState] = useState(value);
  const callbackComparator = usePreservedCallback(comparator ?? deepEqual);

  useEffect(() => {
    if (!callbackComparator(preservedState, value)) {
      setPreservedState(value);
    }
  }, [callbackComparator, preservedState, value]);

  return preservedState;
};
