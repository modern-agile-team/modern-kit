import { isFunction } from '@modern-kit/utils';
import React, { useCallback } from 'react';

const mergeRefs = <T = unknown>(...refs: React.Ref<T>[]) => {
  return (node: T) =>
    refs.forEach((ref) => {
      if (isFunction(ref)) {
        ref(node);
      } else if (ref != null) {
        const refToUse = ref as React.MutableRefObject<T>;
        refToUse.current = node;
      }
    });
};
export function useMergeRefs<T = unknown>(
  ...refs: React.Ref<T>[]
): React.RefCallback<T> {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(mergeRefs(...refs), refs);
}
