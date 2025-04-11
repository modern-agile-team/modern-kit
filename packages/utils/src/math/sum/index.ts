/**
 * @description 숫자 배열의 모든 요소를 합산하는 함수
 *
 * @param {number[] | readonly number[]} arr - 숫자 배열
 * @returns {number} 배열의 모든 숫자의 합
 *
 * @example
 * sum([1, 2, 3]); // 6
 */
export function sum(arr: number[] | readonly number[]): number;

/**
 * @description iteratee 함수를 사용하여 배열의 각 요소를 변환한 후 합산하는 함수
 *
 * @template T - 배열 요소의 타입
 * @param {T[] | readonly T[]} arr - 배열
 * @param {(item: T) => number} iteratee - 배열 요소를 처리하는 함수
 * @returns {number} 배열의 모든 숫자의 합
 *
 * @example
 * sum([1, 2, 3], (item) => item * 2); // 12
 */
export function sum<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): number;

/**
 * @description 숫자 배열의 모든 요소를 합산하는 함수
 *
 * iteratee 함수를 사용하여 배열의 각 요소를 변환한 후 합산하는 함수
 *
 * @template T - 배열 요소의 타입
 * @param {T[] | readonly T[]} arr - 배열
 * @param {(item: T) => number} iteratee - 배열 요소를 처리하는 함수
 * @returns {number} 배열의 모든 숫자의 합
 *
 * @example
 * sum([1, 2, 3]); // 6
 *
 * @example
 * sum([{ value : 1 }, { value : 2 }, { value : 3 }], (item) => item.value); // 6
 */
export function sum<T>(
  arr: T[] | readonly T[],
  iteratee?: (item: T) => number
): number {
  if (!iteratee) {
    return (arr as number[]).reduce((acc, cur) => acc + cur, 0);
  }

  let acc = 0;

  for (let i = 0; i < arr.length; i++) {
    acc += iteratee(arr[i]);
  }

  return acc;
}
