import { useEffect, useState } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';
import { isEqual } from '@modern-kit/utils';

export function usePreservedState<T>(
  value: T,
  comparator: (source: any, target: any) => boolean = isEqual
) {
  const [preservedState, setPreservedState] = useState(value);
  const callbackComparator = usePreservedCallback(comparator);

  useEffect(() => {
    if (!callbackComparator(preservedState, value)) {
      setPreservedState(value);
    }
  }, [callbackComparator, preservedState, value]);

  return preservedState;
}
