/**
 * @description 주어진 배열의 각 요소에 대해 `오른쪽에서 왼쪽으로` 순회하며 제공된 `콜백 함수`를 호출하고, 결과를 새로운 배열로 반환하는 함수입니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @template U - 반환 배열 요소의 유형입니다.
 * @param {T[] | readonly T[]} arr - 순회할 배열입니다. 변경 가능한 배열 또는 읽기 전용 배열일 수 있습니다.
 * @param {(currentValue: T, index: number, arr: T[] | readonly T[]) => U} callback - 배열의 각 요소에 대해 호출할 함수입니다.
 * - `currentValue` - 현재 처리 중인 배열 요소입니다.
 * - `index` - 현재 요소의 인덱스입니다.
 * - `arr` - 순회 중인 배열 자체입니다.
 * @returns {U[]} 새로운 배열을 반환합니다. 각 요소는 `callback`의 반환 값입니다.
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
