/**
 * @description 주어진 문자열에 대문자가 포함되어 있는지 확인하는 함수입니다.
 *
 * @param {string} value - 확인할 문자열
 * @returns {boolean} 대문자가 포함되어 있는지 여부
 *
 * @example
 * containsUpperCase('Hello'); // true
 *
 * @example
 * containsUpperCase('hello'); // false
 * containsUpperCase('!@#$%'); // false
 */
export function containsUpperCase(value: string): boolean {
  return /[A-Z]/.test(value);
}
