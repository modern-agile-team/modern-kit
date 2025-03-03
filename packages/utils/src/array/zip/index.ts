/**
 * @description 여러 배열을 결합하여 튜플 형태의 배열을 반환합니다.
 *
 * 입력 배열들의 길이가 서로 다르다면, 결과 배열은 가장 긴 입력 배열의 길이를 가집니다.
 *
 * 누락된 요소에 대해서는 undefined 값이 사용됩니다.
 *
 * @template T, U, V, W
 * @param {T[]} [arr1] - 결합할 첫번째 배열입니다.
 * @param {U[]} [arr2] - 결합할 두번째 배열입니다.
 * @param {V[]} [arr3] - 결합할 세번째 배열입니다.
 * @param {W[]} [arr4] - 결합할 네번째 배열입니다.
 * @returns {[T, U, V, W][]} - 결합된 배열을 반환합니다.
 *
 * @example
 * const arr1 = [1, 2, 3];
 * const arr2 = ['a', 'b', 'c'];
 * const arr3 = [true, false, true];
 * const arr4 = [null, null];
 *
 * zip(arr1); // [[1], [2], [3]]
 * zip(arr1, arr2); // [[1, 'a'], [2, 'b'], [3, 'c']]
 * zip(arr1, arr2, arr3); // [[1, 'a', true], [2, 'b', false], [3, 'c', true]]
 * zip(arr1, arr2, arr3, arr4); // [[1, 'a', true, null], [2, 'b', false, null], [3, 'c', true, undefined]]
 */

export function zip<T>(arr1: T[] | readonly T[]): [T][];
export function zip<T, U>(
  arr1: T[] | readonly T[],
  arr2: U[] | readonly U[]
): [T, U][];
export function zip<T, U, V>(
  arr1: T[] | readonly T[],
  arr2: U[] | readonly U[],
  arr3: V[] | readonly V[]
): [T, U, V][];
export function zip<T, U, V, W>(
  arr1: T[] | readonly T[],
  arr2: U[] | readonly U[],
  arr3: V[] | readonly V[],
  arr4: W[] | readonly W[]
): [T, U, V, W][];
export function zip<T>(...arrs: (readonly T[])[]): T[][] {
  const maxLength = Math.max(...arrs.map((arr) => arr.length));

  const result: T[][] = [];

  for (let i = 0; i < maxLength; i++) {
    result.push(arrs.map((arr) => arr[i]));
  }

  return result;
}
