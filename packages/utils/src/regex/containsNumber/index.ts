/**
 * @description 주어진 문자열에 숫자가 포함되어 있는지 확인하는 함수입니다.
 *
 * @param {string} value - 확인할 문자열
 * @returns {boolean} 숫자가 포함되어 있는지 여부
 *
 * @example
 * containsNumber('12345'); // true
 * containsNumber('123abc'); // true
 *
 * @example
 * containsNumber('Hello'); // false
 * containsNumber('!@#$%'); // false
 */
export function containsNumber(value: string): boolean {
  return /\d/.test(value);
}
