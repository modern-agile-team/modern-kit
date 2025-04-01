import { sum } from '../sum';

/**
 * @description 숫자 배열의 모든 요소를 합산하여 평균을 구하는 함수
 *
 * @param {number[] | readonly number[]} arr - 숫자 배열
 * @returns {number} 배열의 모든 숫자의 평균
 *
 * @example
 * average([1, 2, 3]); // 2
 */
export function average(arr: number[] | readonly number[]): number;

/**
 * @description 배열의 모든 요소를 iteratee 함수를 기반으로 합산하여 평균을 구하는 함수
 *
 * @template T - 배열 요소의 타입
 * @param {T[] | readonly T[]} arr - 배열
 * @param {(item: T) => number} iteratee - 배열 요소를 처리하는 함수
 * @returns {number} 배열의 모든 숫자의 평균
 *
 * @example
 * average([{ value : 1 }, { value : 2 }, { value : 3 }], (item) => item.value); // 2
 */
export function average<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): number;

/**
 * @description 숫자 배열의 모든 요소를 합산하여 평균을 구하는 함수
 *
 * iteratee 함수를 제공하는 경우 iteratee 함수의 반환값을 기준으로 평균을 구합니다.
 *
 * @template T - 배열 요소의 타입
 * @param {T[] | readonly T[]} arr - 배열
 * @param {(item: T) => number} iteratee - 배열 요소를 처리하는 함수
 * @returns {number} 배열의 모든 숫자의 평균
 *
 * @example
 * average([1, 2, 3]); // 2
 *
 * @example
 * average([{ value : 1 }, { value : 2 }, { value : 3 }], (item) => item.value); // 2
 */
export function average<T>(
  arr: T[] | readonly T[],
  iteratee?: (item: T) => number
): number {
  if (arr.length < 1) return 0;

  if (!iteratee) {
    return sum(arr as number[]) / arr.length;
  }

  return sum(arr, iteratee) / arr.length;
}
