import { flatten } from '../flatten';

/**
 * 각 배열 요소를 iteratee 함수로 매핑하고 지정된 깊이까지 결과를 평탄화합니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @template U - iteratee 함수에서 반환되는 배열 요소들의 타입입니다.
 * @template D - 평탄화 깊이의 유형입니다.
 * @param {T[] | readonly T[]} arr - 평탄화할 중첩 배열입니다.
 * @param {(item: T) => U} iteratee - 새로운 배열 요소를 생성하는 함수입니다.
 * @param {D} [depth=1] - 평탄화할 깊이입니다. 기본값은 1입니다.
 * @returns {FlatArray<U[], D>[]} - 평탄화된 새로운 배열을 반환합니다.
 *
 * @example
 * const arr = [1, 2, 3];
 *
 * flatMap(arr, (item: number) => [item, item]);
 * // [1, 1, 2, 2, 3, 3]
 *
 * flatMap(arr, (item: number) => [[item, item]], 2);
 * // [1, 1, 2, 2, 3, 3]
 */
export function flatMap<T, U, D extends number = 1>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => U,
  depth: D = 1 as D
): FlatArray<U[], D>[] {
  return flatten(
    arr.map((item) => iteratee(item)),
    depth
  );
}
