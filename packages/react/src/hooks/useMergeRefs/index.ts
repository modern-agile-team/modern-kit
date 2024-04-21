import React, { useCallback } from 'react';

export const useMergeRefs = <T = any>(
  ...refs: (React.MutableRefObject<T> | React.LegacyRef<T>)[]
): React.RefCallback<T> => {
  return useCallback(
    (value: T) => {
      refs.forEach((ref) => {
        if (typeof ref === 'function') {
          ref(value);
        } else if (ref != null) {
          (ref as React.MutableRefObject<T>).current = value;
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...refs]
  );
};
