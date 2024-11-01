import { uniq } from '../uniq';

/**
 * @description 두 배열을 결합하고, 중복된 요소를 제거하여 고유한 값들로 이루어진 새 배열을 반환합니다.
 *
 * 기본적으로 `원시 값`에 대해서만 중복 요소를 판단합니다.
 *
 * 2번째 인자인 `iteratee` 함수를 제공하면, 각 요소를 iteratee 반환값에 따라 중복 여부를 판단할 수 있습니다.
 *
 * `iteratee` 함수를 제공하면, 각 요소를 특정 기준으로 중복을 판단할 수 있습니다.
 *
 * @template T - 배열 요소의 타입
 * @template U - `iteratee` 함수가 반환하는 값의 타입으로, 중복 판단에 사용됩니다.
 *
 * @param {T[] | readonly T[]} arr1 - 결합하고자 하는 첫 번째 배열
 * @param {T[] | readonly T[]} arr2 - 결합하고자 하는 두 번째 배열
 * @param iteratee - 각 요소를 특정 값으로 변환하여 중복 여부를 판단하는 함수입니다.
 *
 * @returns {T[]} 두 배열의 합집합을 나타내는 배열을 반환하며, 중복은 제거됩니다.
 *
 * @example
 * union([1, 2, 3], [2, 3, 4]); // [1, 2, 3, 4]
 *
 * @example
 * union(
 *   [{ id: 1 }, { id: 2 }],
 *   [{ id: 2 }, { id: 3 }],
 *   item => item.id
 * ); // [{ id: 1 }, { id: 2 }, { id: 3 }]
 */
export function union<T>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[]
): T[];

export function union<T, U = T>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[],
  iteratee?: (item: T) => U
): T[];

export function union<T, U = T>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[],
  iteratee?: (item: T) => U
): T[] {
  return uniq(arr1.concat(arr2), iteratee);
}
