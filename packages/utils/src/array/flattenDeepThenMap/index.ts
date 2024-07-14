import { ExtractNestedArrayType } from '@modern-kit/types';
import { flattenDeep } from '..';

/**
 * @description 중첩 배열의 모든 깊이를 평탄화 한 후 제공된 iteratee 함수를 사용하여 각 요소를 매핑합니다.
 *
 * arr.flat(Infinity).map(iteratee)와 동일하게 동작하며, 타입 문제를 개선합니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @template U - 매핑 함수에 의해 반환되는 새로운 요소의 유형입니다.
 * @param {T[] | readonly T[]}arr - 평탄화할 중첩 배열입니다.
 * @param {(item: ExtractNestedArrayType<T>) => U} iteratee - 평탄화 후 각 요소에 적용 할 함수입니다.
 * @returns 평탄화 후 각 요소가 iteratee 함수로 매핑된 새로운 배열입니다.
 *
 * @example
 * const arr = [1, [2, [3, [4]]]];
 * const iteratee = (item: number) => item * 2;
 *
 * flattenDeepThenMap(arr, iteratee);
 * // [2, 4, 6, 8]
 */
export function flattenDeepThenMap<T, U>(
  arr: T[] | readonly T[],
  iteratee: (item: ExtractNestedArrayType<T>) => U
) {
  return flattenDeep(arr).map((item) => iteratee(item));
}
