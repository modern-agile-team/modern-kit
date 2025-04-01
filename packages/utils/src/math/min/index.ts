/**
 * @description 숫자 배열에서 최소값을 반환하는 함수
 *
 * @param {number[] | readonly number[]} arr - 숫자 배열
 * @returns {number} 최소값
 *
 * @example
 * min([1, 2, 3]); // 1
 */
export function min(arr: number[] | readonly number[]): number;

/**
 * @description 배열에서 iteratee 함수를 기반으로 최소값을 가진 항목을 반환합니다.
 *
 * @template T - 배열 요소의 타입
 * @param {T[] | readonly T[]} arr - 배열
 * @param {(item: T) => number} iteratee - 배열 요소를 처리하는 함수
 * @returns {T} 최소값을 가진 항목
 *
 * @example
 * min([{ value: 1 }, { value: 2 }, { value: 3 }], (item) => item.value); // { value: 1 }
 */
export function min<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): T;

/**
 * @description 배열에서 최소값을 반환하는 함수
 *
 * iteratee 함수를 제공하는 경우 iteratee 함수를 기반으로 배열의 각 요소를 변환한 후 최소값을 가진 항목을 반환합니다.
 *
 * @template T - 배열 요소의 타입
 * @param {T[] | readonly T[]} arr - 객체 배열
 * @param {(item: T) => number} iteratee - 배열 요소를 처리하는 함수
 * @returns {T} 최소값을 가진 항목
 *
 * @example
 * min([1, 2, 3]); // 1
 *
 * @example
 * min([{ value: 1 }, { value: 2 }, { value: 3 }], (item) => item.value); // { value: 1 }
 */
export function min<T>(
  arr: T[] | readonly T[],
  iteratee?: (item: T) => number
): T | number {
  let minValue = Number.MAX_SAFE_INTEGER;
  let minItem = arr[0];

  if (arr.length < 1) return minItem;

  if (!iteratee) {
    return Math.min(...(arr as number[]));
  }

  for (let i = 0; i < arr.length; i++) {
    const value = iteratee(arr[i]);

    if (value < minValue) {
      minItem = arr[i];
      minValue = value;
    }
  }

  return minItem;
}
