/**
 * @description 중첩 배열을 지정된 깊이까지 평탄화 합니다.
 *
 * Array.prototype.flat과 동일하게 동작합니다. 하지만 성능이 더 우수합니다.(약 6~7배)
 *
 * @template T - 배열 요소의 유형입니다.
 * @template D - 평탄화 깊이의 유형입니다.
 * @param {T[] | readonly T[]} arr - 평탄화할 중첩 배열입니다.
 * @param {D} [depth=1] - 평탄화할 깊이입니다. 기본값은 1입니다.
 * @returns {FlatArray<T[], D>[]} 평탄화된 새로운 배열을 반환합니다.
 *
 * @example
 * const arr = [1, [2, 3], [4, [5, 6]]];
 *
 * flatten(arr, 1);
 * // [1, 2, 3, 4, [5, 6]]
 *
 * flatten(arr, 2);
 * // [1, 2, 3, 4, 5, 6]
 */
export function flatten<T, D extends number = 1>(
  arr: T[] | readonly T[],
  depth = 1 as D
): FlatArray<T[], D>[] {
  const result: FlatArray<T[], D>[] = [];
  const flooredDepth = Math.floor(depth);

  const recursive = (arr: readonly T[], currentDepth: number) => {
    for (const item of arr) {
      if (Array.isArray(item) && currentDepth < flooredDepth) {
        recursive(item, currentDepth + 1);
      } else {
        result.push(item as FlatArray<T[], D>);
      }
    }
  };

  recursive(arr, 0);
  return result;
}
