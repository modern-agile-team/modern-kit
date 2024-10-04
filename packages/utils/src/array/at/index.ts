/**
 * @description 주어진 배열에서 특정 인덱스의 요소를 반환하는 함수입니다.
 *
 * @template T - 배열 요소의 타입.
 * @param {T[] | readonly T[]}arr - 요소를 찾을 배열입니다.
 * @param {number} [index=0] - 가져오고자 하는 요소의 인덱스입니다. 양수 뿐만 아니라 음수 값을 사용하여 배열의 끝에서부터 요소를 가져올 수 있습니다.
 * @returns {T | undefined} 주어진 인덱스에 해당하는 배열 요소를 반환합니다. 인덱스가 유효하지 않을 경우 `undefined`를 반환합니다.
 *
 * @example
 * const arr = [1, 2, 3];
 *
 * at([1, 2, 3, 4, 5]); // 1
 * at([1, 2, 3, 4, 5], 0); // 1
 * at([1, 2, 3, 4, 5], 1); // 2
 * at([1, 2, 3, 4, 5], 2); // 3
 *
 * @example
 * at([1, 2, 3, 4, 5], -1); // 3
 * at([1, 2, 3, 4, 5], -2); // 2
 * at([1, 2, 3, 4, 5], -3); // 1
 */
export function at<T>(
  arr: T[] | readonly T[],
  index: number = 0
): T | undefined {
  const len = arr.length;
  const relativeIndex = index < 0 ? len + index : index;

  if (relativeIndex < 0 || relativeIndex >= len) {
    return undefined;
  }

  return arr[relativeIndex];
}
