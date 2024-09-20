import { useEffect, useState } from 'react';
import { usePreservedCallback } from '../usePreservedCallback';
import { isEqual } from '@modern-kit/utils';

/**
 * @description `usePreservedState`는 주어진 값과 비교 함수(comparator)를 사용하여 상태를 보존하는 커스텀 훅입니다.
 *
 * 이 훅은 주어진 값이 변경될 때마다 비교 함수(comparator)를 통해 이전 상태와 새로운 값을 비교하여,
 * 값이 다르다고 판단될 때에만 상태를 업데이트합니다. 이를 통해 불필요한 상태 업데이트를 방지할 수 있습니다.
 *
 * @template T - 상태로 보존할 값의 타입.
 * @param {T} value - 보존하고자 하는 초기 값.
 * @param {(source: T, target: T) => boolean} [comparator=isEqual] - 상태 비교를 위한 함수.
 * @returns {T} 보존된 상태 값을 반환합니다.
 *
 * @example
 * // default comparator
 * const preservedState = usePreservedState({
 *   group: 'bgzt',
 * });
 *
 * @example
 * // custom comparator
 * const preservedState = usePreservedState({
 *   group: 'bgzt',
 * }, (a, b) => a.group === b.group);
 */
export function usePreservedState<T>(
  value: T,
  comparator: (source: T, target: T) => boolean = isEqual
): T {
  const [preservedState, setPreservedState] = useState(value);
  const callbackComparator = usePreservedCallback(comparator);

  useEffect(() => {
    if (!callbackComparator(preservedState, value)) {
      setPreservedState(value);
    }
  }, [callbackComparator, preservedState, value]);

  return preservedState;
}
