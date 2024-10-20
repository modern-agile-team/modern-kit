/**
 * @description 배열을 주어진 조건에 따라 두 개의 배열로 분할합니다.
 *
 * @template T - 배열의 요소 타입
 * @param {T[] | readonly T[]} arr - 분할할 배열
 * @param {(item: T) => boolean} predicate - 배열의 각 요소에 대해 참/거짓을 반환하는 함수
 * @returns {[truthyArray: T[], falsyArray: T[]]} 조건을 만족하는 요소와 그렇지 않은 요소를 각각 포함하는 두 개의 배열을 반환합니다.
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const [even, odd] = partition(numbers, (num) => num % 2 === 0);
 *
 * even; // [2, 4]
 * odd; // [1, 3, 5]
 */
export function partition<T>(
  arr: T[] | readonly T[],
  predicate: (item: T) => boolean
): [truthyArray: T[], falsyArray: T[]] {
  const truthyArray: T[] = [];
  const falsyArray: T[] = [];

  for (const item of arr) {
    if (predicate(item)) {
      truthyArray.push(item);
    } else {
      falsyArray.push(item);
    }
  }

  return [truthyArray, falsyArray];
}
