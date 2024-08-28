import { difference } from '../../array';

/**
 * @description `subset` 배열이 `superset` 배열의 부분집합인지 여부를 검사합니다.
 
 * 선택적으로, `iteratee` 함수를 제공하여 각 요소를 비교하기 전에 변환할 수 있습니다.
 *
 * @template T - `superset`과 `subset` 배열의 요소 타입.
 * @template U - 선택적인 `iteratee` 함수가 반환하는 값의 타입.
 *
 * @param {T[] | readonly T[]} superset - 부분집합을 검사할 상위 배열.
 * @param {T[] | readonly T[]} subset - 상위 배열에 포함되어 있는지 확인할 부분집합 배열.
 * @param {(item: T) => U} [iteratee] - 각 요소에 대해 적용할 선택적 변환 함수.
 * @returns {boolean} - `subset`이 `superset`의 부분집합이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const superset = [1, 2, 3, 4];
 * const subset = [2, 3];
 * isSubset(superset, subset); // true
 *
 * @example
 * const superset = [1, 2, 3, 4];
 * const notSubset = [2, 5];
 * isSubset(superset, notSubset); // false
 *
 * @example
 * const superset = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const subset = [{ id: 1 }, { id: 2 }];
 * isSubset(customSuperset, customSubset, item => item.id); // true
 */
export function isSubset<T, U>(
  superset: T[] | readonly T[],
  subset: T[] | readonly T[],
  iteratee?: (item: T) => U
): boolean {
  return difference(subset, superset, iteratee).length === 0;
}
