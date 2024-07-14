/**
 * @description 주어진 배열의 각 요소에 대해 `오른쪽에서 왼쪽으로` 순회하며 제공된 `콜백 함수`를 호출합니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @param {T[] | readonly T[]} array - 순회할 배열입니다. 변경 가능한 배열 또는 읽기 전용 배열일 수 있습니다.
 * @param {(currentValue: T, index: number, array: T[] | readonly T[]) => void} callback - 배열의 각 요소에 대해 호출할 함수입니다.
 * - `currentValue` - 현재 처리 중인 배열 요소입니다.
 * - `index` - 현재 요소의 인덱스입니다.
 * - `array` - 순회 중인 배열 자체입니다.
 * @returns {void} 반환값이 없습니다.
 */
export function forEachRight<T>(
  array: T[] | readonly T[],
  callback: (currentValue: T, index: number, array: T[] | readonly T[]) => void
): void {
  for (let i = array.length - 1; i >= 0; i--) {
    callback(array[i], i, array);
  }
}
