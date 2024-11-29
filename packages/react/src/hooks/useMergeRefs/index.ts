import React, { useCallback } from 'react';
import { mergeRefs } from '../../utils/mergeRefs';

/**
 * @description `useMergeRefs`는 여러 개의 React ref를 하나의 ref로 병합하여, 한 번에 여러 ref에 값을 설정할 수 있도록 하는 커스텀 훅입니다.
 *
 * 이 훅은 주어진 ref들을 병합하여, 하나의 `ref callback`을 반환합니다. 반환된 `ref callback`은 컴포넌트에 전달되어,
 * 해당 컴포넌트의 DOM 요소나 인스턴스가 모두 제공된 ref에 적용됩니다.
 *
 * @template T - ref가 가리키는 요소 또는 인스턴스의 타입.
 * @param {React.Ref<T>[]} refs - 병합하고자 하는 여러 개의 ref.
 * @returns {React.RefCallback<T>} 병합된 ref를 처리하는 하나의 `ref callback`을 반환합니다.
 *
 * @example
 * <Component ref={useMergeRefs(ref1, ref2, ref3)} />
 */
export function useMergeRefs<T = unknown>(
  ...refs: React.Ref<T>[]
): React.RefCallback<T> {
  // eslint-disable-next-line
  return useCallback(mergeRefs(...refs), refs);
}

export { mergeRefs };
