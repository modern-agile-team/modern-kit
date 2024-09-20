/**
 * @description 배열의 첫 요소부터 n개의 요소를 가져온 새로운 배열을 반환합니다.
 *
 * 배열 외에 별도의 인자가 없는 경우 첫 번째 요소만 가져온 새로운 배열을 반환합니다.
 *
 * 배열의 길이보다 가져오고자 하는 index값이 더 큰 경우 전체 배열을 반환합니다.
 *
 * 가져오고자 하는 index가 음수인 경우에는 빈 배열을 반환합니다.
 *
 * @param {T[] | readonly T[]} arr - 요소를 가져올 배열입니다.
 * @param {number} [count=1] - 가져올 요소의 개수입니다.
 * @returns {T[]} - 가져온 요소가 포함된 새로운 배열을 반환합니다.
 *
 * @example
 * take([1, 2, 3, 4, 5]);
 * // [1]
 *
 * take([1, 2, 3, 4, 5], 0)
 * // []
 *
 * take([1, 2, 3, 4, 5], 2)
 * // [1, 2]
 *
 * take([1, 2, 3, 4, 5], 7)
 * // [1, 2, 3, 4, 5]
 */
export function take<T>(arr: T[] | readonly T[], count: number = 1): T[] {
  return arr.slice(0, Math.max(count, 0));
}
