/**
 * @description 숫자 배열의 요소들을 순차적으로 뺄셈하는 함수
 *
 * @param {number[] | readonly number[]} arr - 숫자 배열
 * @returns {number} 배열의 모든 숫자를 순차적으로 뺀 결과
 *
 * @example
 * subtract([10, 2, 3]); // 5 (10 - 2 - 3)
 */
export function subtract(arr: number[] | readonly number[]): number;

/**
 * @description 배열의 모든 요소를 iteratee 함수를 기반으로 순차적으로 뺄셈하는 함수
 *
 * @template T - 배열 요소의 타입
 * @param {T[] | readonly T[]} arr - 배열
 * @param {(item: T) => number} iteratee - 배열 요소를 처리하는 함수
 * @returns {number} 배열의 모든 숫자를 순차적으로 뺀 결과
 *
 * @example
 * subtract([{ value: 10 }, { value: 2 }, { value: 3 }], (item) => item.value); // 5 (10 - 2 - 3)
 */
export function subtract<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): number;

/**
 * @description 숫자 배열의 요소들을 순차적으로 뺄셈하는 함수
 *
 * iteratee 함수를 제공하는 경우 iteratee 함수를 기반으로 배열의 각 요소를 변환한 후 뺄셈합니다.
 *
 * @template T - 배열 요소의 타입
 * @param {T[] | readonly T[]} arr - 배열
 * @param {(item: T) => number} iteratee - 배열 요소를 처리하는 함수
 * @returns {number} 배열의 모든 숫자를 순차적으로 뺀 결과
 *
 * @example
 * subtract([10, 2, 3]); // 5 (10 - 2 - 3)
 *
 * @example
 * subtract([{ value: 10 }, { value: 2 }, { value: 3 }], (item) => item.value); // 5 (10 - 2 - 3)
 */
export function subtract<T>(
  arr: T[] | readonly T[],
  iteratee?: (item: T) => number
): number {
  if (arr.length === 0) return 0;

  const [first, ...rest] = arr;

  const calculateSubtract = () => {
    let acc = first as number;
    for (let i = 0; i < rest.length; i++) {
      acc -= rest[i] as number;
    }
    return acc;
  };

  const calculateSubtractWithIteratee = (iteratee: (item: T) => number) => {
    let acc = iteratee(first);
    for (let i = 0; i < rest.length; i++) {
      acc -= iteratee(rest[i]);
    }
    return acc;
  };

  return iteratee
    ? calculateSubtractWithIteratee(iteratee)
    : calculateSubtract();
}
