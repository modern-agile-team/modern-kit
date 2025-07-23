/**
 * @description 주어진 배열의 각 요소에 대해 `오른쪽에서 왼쪽으로` 순회하며 제공된 `콜백 함수`를 호출하고, 결과를 새로운 배열로 반환하는 함수입니다.
 * Array.prototype.map의 반대 방향으로 동작합니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @template U - 반환 배열 요소의 유형입니다.
 * @param {T[] | readonly T[]} arr - 순회할 배열입니다.
 * @param {(currentValue: T, index: number, arr: T[] | readonly T[]) => U} callback - 배열의 각 요소에 대해 호출할 함수입니다.
 * @returns {U[]} 새로운 배열을 반환합니다. 각 요소는 `callback`의 반환 값입니다.
 *
 * @example
 * const arr = [1, 2, 3, 4, 5];
 *
 * mapRight(arr, (value, index, array) => value * 2);
 * // [10, 8, 6, 4, 2]
 */
export function mapRight<T, U>(
  arr: T[] | readonly T[],
  callback: (currentValue: T, index: number, arr: T[] | readonly T[]) => U
): U[] {
  const result: U[] = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    result.push(callback(arr[i], i, arr));
  }

  return result;
}
