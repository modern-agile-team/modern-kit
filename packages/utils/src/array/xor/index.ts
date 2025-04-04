import { union } from '../union';
import { difference } from '../difference';
import { intersection } from '../intersection';

/**
 * @description 두 배열 간의 대칭 차집합(XOR)를 계산하는 함수입니다.
 * 결과는 두 배열 중 하나에만 존재하는 요소들로 구성됩니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @param {T[] | readonly T[]} arr1 - 첫 번째 입력 배열입니다.
 * @param {T[] | readonly T[]} arr2 - 두 번째 입력 배열입니다.
 *
 * @returns {T[]} 두 배열의 대칭 차집합(XOR)을 포함하는 새 배열을 반환합니다.
 *
 * @example
 * xor([1, 2], [2, 3]); // [1, 3]
 */
export function xor<T>(arr1: T[] | readonly T[], arr2: T[] | readonly T[]): T[];

/**
 * @description 두 배열 간의 각 요소에 iteratee 함수를 적용한 후 대칭 차집합(XOR)을 계산하는 함수입니다.
 * 결과는 두 배열 중 하나에만 존재하는 요소들로 구성됩니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @template U - iteratee 함수의 반환값 유형입니다.
 * @param {T[] | readonly T[]} arr1 - 첫 번째 입력 배열입니다.
 * @param {T[] | readonly T[]} arr2 - 두 번째 입력 배열입니다.
 * @param {(item: T) => U} iteratee - 선택적 반복자 함수입니다.
 *
 * @returns {T[]} 두 배열의 대칭 차집합(XOR)을 포함하는 새 배열을 반환합니다.
 *
 * @example
 * xor([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x) => x.id);
 * // [{ id: 1 }, { id: 3 }]
 */
export function xor<T, U>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[],
  iteratee: (item: T) => U
): T[];

/**
 * @description 두 배열 간의 대칭 차이(XOR)를 계산하는 함수입니다.
 * 결과는 두 배열 중 하나에만 존재하는 요소들로 구성됩니다.
 *
 * iteratee 함수를 제공하는 경우 iteratee 함수를 기반으로 배열의 각 요소를 변환한 후 대칭 차집합(XOR)을 계산합니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @template U - iteratee 함수의 반환값 유형입니다.
 * @param {T[] | readonly T[]} arr1 - 첫 번째 입력 배열입니다.
 * @param {T[] | readonly T[]} arr2 - 두 번째 입력 배열입니다.
 * @param {(item: T) => U} iteratee - 선택적 반복자 함수입니다.
 *
 * @returns {T[]} 두 배열의 대칭 차집합(XOR)을 포함하는 새 배열을 반환합니다.
 *
 * @example
 * xor([1, 2], [2, 3]); // [1, 3]
 *
 * @example
 * xor([{ id: 1 }, { id: 2 }], [{ id: 2 }, { id: 3 }], (x) => x.id);
 * // [{ id: 1 }, { id: 3 }]
 */
export function xor<T, U>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[],
  iteratee?: (item: T) => U
): T[] {
  return difference(
    union(arr1, arr2, iteratee),
    intersection(arr1, arr2, iteratee),
    iteratee
  );
}
