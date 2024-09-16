/**
 *
 * @description 배열의 첫 요소부터 n개의 요소가 삭제된 새로운 배열을 반환합니다.
 *
 * 배열 외에 별도의 인자가 없는 경우 첫 번째 요소만 삭제된 새로운 배열을 반환합니다.
 *
 * 배열의 길이보다 제거하고자 하는 index값이 더 큰 경우 빈 배열을 반환합니다.
 *
 * @param {T[]} target - 요소를 제거할 배열입니다.
 * @param {number} [count=1] - 삭제할 요소의 개수입니다.
 * @returns {T[]} - 삭제된 요소가 제거된 새로운 배열을 반환합니다.
 *
 * @example
 * drop([1, 2, 3, 4, 5]);
 * // [2, 3, 4, 5]
 * drop([1, 2, 3, 4, 5], 0)
 * // [1, 2, 3, 4, 5]
 * drop([1, 2, 3, 4, 5], 2)
 * // [3, 4, 5]
 * drop([1, 2, 3, 4, 5], 7)
 * // []
 */
export function drop<T>(target: T[], count: number = 1): T[] {
  if (count > target.length) return [];

  const result = [...target];

  for (let i = 0; i < count; i++) {
    result.shift();
  }

  return result;
}
