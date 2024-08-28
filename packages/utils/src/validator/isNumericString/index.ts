/**
 * @description 문자열이 숫자만으로 이루어졌는지 확인합니다.
 *
 * @param {string} value - 숫자만으로 이루어졌는지 확인할 문자열.
 * @returns {boolean} - 문자열이 숫자만으로 이루어졌다면 `true`, 그렇지 않다면 `false`를 반환합니다.
 *
 * @example
 * isNumericString("12345"); // true
 *
 * @example
 * isNumericString("123a45"); // false
 * isNumericString(""); // false
 */
export function isNumericString(value: string): boolean {
  return /^[0-9]+$/.test(value);
}
