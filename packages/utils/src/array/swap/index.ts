/**
 * @description 배열 내의 두 요소의 위치를 교환합니다.
 *
 * 기본적으로 원본 배열을 직접 수정하지만, immutable 옵션을 통해
 * 새로운 배열을 반환하도록 설정할 수 있습니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @param {T[] | readonly T[]} arr - 요소를 교환할 대상 배열입니다.
 * @param {number} i - 교환할 첫 번째 요소의 인덱스입니다.
 * @param {number} j - 교환할 두 번째 요소의 인덱스입니다.
 * @param options - 추가 옵션을 포함하는 객체입니다.
 * @param {boolean} [options.immutable=false] - true일 경우, 원본 배열을 수정하지 않고 새 배열을 반환합니다.
 * @returns {T[]} 요소가 교환된 배열입니다. immutable이 false면 원본 배열, true면 새로운 배열입니다.
 *
 * @example
 * const arr = [1, 2, 3];
 * swap(arr, 0, 2); // [3, 2, 1]
 * console.log(arr); // [3, 2, 1] (원본 배열 유지)
 *
 * @example
 * const arr = [1, 2, 3];
 * const newArr = swap(arr, 0, 2, { immutable: true }); // [3, 2, 1]
 * console.log(arr);    // [1, 2, 3] (원본 배열 유지)
 * console.log(newArr); // [3, 2, 1] (새로운 배열 반환)
 */
export function swap<T>(
  arr: T[] | readonly T[],
  i: number,
  j: number,
  options?: { immutable?: boolean }
): T[] {
  const immutable = options?.immutable ?? false;
  const result = immutable ? [...arr] : (arr as T[]);
  
  [result[i], result[j]] = [result[j], result[i]];
  return result;
}
