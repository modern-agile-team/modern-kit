import React, { useCallback } from 'react';

const mergeRefs = <T = unknown>(...refs: React.Ref<T>[]) => {
  return (node: T) =>
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref != null) {
        const refToUse = ref as React.MutableRefObject<T>;
        refToUse.current = node;
      }
    });
};
export const useMergeRefs = <T = unknown>(
  ...refs: React.Ref<T>[]
): React.RefCallback<T> => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(mergeRefs(...refs), refs);
};
