/**
 * @description 주어진 배열의 각 요소에 대해 `오른쪽에서 왼쪽으로` 순회하며 제공된 `콜백 함수`를 호출합니다.
 * Array.prototype.forEach의 반대 방향으로 동작합니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @param {T[] | readonly T[]} arr - 순회할 배열입니다.
 * @param {(currentValue: T, index: number, arr: T[] | readonly T[]) => void} callback - 배열의 각 요소에 대해 호출할 함수입니다.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * forEachRight(arr, (value, index, array) => {
 *   console.log(value, index, array);
 *   // 5 4 [1, 2, 3, 4, 5]
 *   // 4 3 [1, 2, 3, 4, 5]
 *   // 3 2 [1, 2, 3, 4, 5]
 *   // 2 1 [1, 2, 3, 4, 5]
 *   // 1 0 [1, 2, 3, 4, 5]
 * });
 */
export function forEachRight<T>(
  arr: T[] | readonly T[],
  callback: (currentValue: T, index: number, arr: T[] | readonly T[]) => void
) {
  for (let i = arr.length - 1; i >= 0; i--) {
    callback(arr[i], i, arr);
  }
}
