/**
 * @description 숫자 배열에서 최대값을 반환하는 함수
 *
 * @param {number[] | readonly number[]} arr - 숫자 배열
 * @returns {number} 최대값
 *
 * @example
 * max([1, 2, 3]); // 3
 */
export function max(arr: number[] | readonly number[]): number;

/**
 * @description 배열에서 iteratee 함수를 기반으로 최대값을 가진 항목을 반환하는 함수
 *
 * @template T - 배열 요소의 타입
 * @param {T[] | readonly T[]} arr - 배열
 * @param {(item: T) => number} iteratee - 배열 요소를 처리하는 함수
 * @returns {T} 최대값을 가진 항목
 *
 * @example
 * max([{ value: 1 }, { value: 2 }, { value: 3 }], (item) => item.value); // { value: 3 }
 */
export function max<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): T;

/**
 * @description 배열에서 최대값을 반환하는 함수
 *
 * iteratee 함수를 제공하는 경우 iteratee 함수를 기반으로 배열의 각 요소를 변환한 후 최대값을 가진 항목을 반환합니다.
 *
 * @template T - 배열 요소의 타입
 * @param {T[] | readonly T[]} arr - 배열
 * @param {(item: T) => number} iteratee - 배열 요소를 처리하는 함수
 * @returns {T} 최대값을 가진 항목
 *
 * @example
 * max([1, 2, 3]); // 3
 *
 * @example
 * max([{ value: 1 }, { value: 2 }, { value: 3 }], (item) => item.value); // { value: 3 }
 */
export function max<T>(
  arr: T[] | readonly T[],
  iteratee?: (item: T) => number
): T | number {
  let maxValue = Number.MIN_SAFE_INTEGER;
  let maxItem = arr[0];

  if (arr.length < 1) return maxItem;

  if (!iteratee) {
    return Math.max(...(arr as number[]));
  }

  for (let i = 0; i < arr.length; i++) {
    const value = iteratee(arr[i]);

    if (value > maxValue) {
      maxItem = arr[i];
      maxValue = value;
    }
  }

  return maxItem;
}
