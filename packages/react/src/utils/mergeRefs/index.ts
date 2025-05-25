import { isFunction } from '@modern-kit/utils';

/**
 * @description 여러 ref 객체를 하나의 ref 객체로 병합합니다.
 *
 * @template T - 참조 객체의 타입
 * @param {React.Ref<T>[]} refs 병합할 참조 객체 배열
 * @returns {((node: T) => void)} 병합된 참조 객체
 *
 * @example
 * ```tsx
 * const ref1 = useRef<HTMLDivElement>(null);
 * const ref2 = useRef<HTMLDivElement>(null);
 * const mergedRef = mergeRefs(ref1, ref2);
 * ```
 */
export const mergeRefs = <T = unknown>(
  ...refs: React.Ref<T>[]
): ((node: T) => void) => {
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
