import { isFunction } from '@modern-kit/utils';

export const mergeRefs = <T = unknown>(...refs: React.Ref<T>[]) => {
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
