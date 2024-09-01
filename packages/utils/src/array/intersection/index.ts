import { uniq } from '../../array/uniq';
import { intersectionWithDuplicates } from '../intersectionWithDuplicates';

/**
 * @description 두 배열 내에서 동일하게 존재하는, `교차된 값(교집합)`에 대한 새로운 배열을 반환하는 함수입니다.
 *
 * 첫번째 배열을 기준으로 `중복된 값을 제거`합니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @template U - iteratee 함수에서 반환되는 배열 요소들의 타입입니다.
 *
 * @param {T[] | readonly T[]} firstArr - 비교할 첫 번째 배열입니다.
 * @param {T[] | readonly T[]} secondArr - 비교할 두 번째 배열입니다.
 * @param {(item: T) => U} iteratee - 새로운 배열 요소를 생성하는 함수입니다. 제공된 경우, 이 함수의 결과를 기준으로 요소들이 비교됩니다.
 *
 * @returns {T[]} - `firstArr`과 `secondArr` 모두에 존재하는 고유한 요소들로 구성된 배열을 반환합니다.
 *
 * @example
 * intersection([1, 2, 3], [2, 3, 4]);
 * // [2, 3]
 *
 * @example
 * intersection(
 *   [{ id: 1 }, { id: 2 }],
 *   [{ id: 2 }, { id: 3 }],
 *   item => item.id
 * );
 * // [{ id: 2 }]
 */
export function intersection<T, U>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee?: (item: T) => U
): T[] {
  const intersection = intersectionWithDuplicates(
    firstArr,
    secondArr,
    iteratee
  );

  return uniq(intersection, iteratee);
}
