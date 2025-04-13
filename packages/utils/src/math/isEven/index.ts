import { isOdd } from '../isOdd';

/**
 * @description 주어진 숫자가 짝수인지 확인합니다.
 * @param {number} value - 짝수인지 확인할 숫자.
 * @returns {boolean} 숫자가 짝수이면 `true`, 홀수이면 `false`를 반환합니다.
 *
 * @example
 * isEven(3); // false
 * isEven(2); // true
 */
export function isEven(value: number): boolean {
  return !isOdd(value);
}
