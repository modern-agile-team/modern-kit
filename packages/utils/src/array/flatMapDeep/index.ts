import { flattenDeep } from '../flattenDeep';

type ExtractNestedArrayType<T> = T extends readonly (infer U)[]
  ? ExtractNestedArrayType<U>
  : T;

/**
 * @description 배열의 각 요소에 iteratee 함수를 적용하고 결과를 모든 깊이로 평탄화합니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @template U - iteratee 함수에서 반환되는 배열 요소들의 타입입니다.
 * @param {T[] | readonly T[]} arr - 평탄화할 중첩 배열입니다.
 * @param {(item: T) => U} iteratee - 새로운 배열 요소를 생성하는 함수입니다.
 * @returns {ExtractNestedArrayType<U>[]} 입력 배열의 각 요소에 iteratee를 적용한 후 깊게 평탄화된 새로운 배열을 반환합니다.
 *
 * @example
 * flatMapDeep([1, 2, 3], n => [[n, n]]);
 * // [1, 1, 2, 2, 3, 3]
 *
 * flatMapDeep([1, 2, 3], n => [[[n, n]]]);
 * // [1, 1, 2, 2, 3, 3]
 */
export function flatMapDeep<T, U>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => U
): ExtractNestedArrayType<U>[] {
  return flattenDeep(arr.map((item: T) => iteratee(item)));
}
