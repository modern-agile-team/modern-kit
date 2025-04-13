/**
 * @description 주어진 숫자가 홀수인지 확인합니다.
 * @param {number} value - 홀수인지 확인할 숫자.
 * @returns {boolean} 숫자가 홀수이면 `true`, 짝수이면 `false`를 반환합니다.
 *
 * @example
 * isOdd(3); // true
 * isOdd(2); // false
 */
export function isOdd(value: number): boolean {
  return value % 2 !== 0;
}
