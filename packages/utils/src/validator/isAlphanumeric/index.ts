/**
 * @description 주어진 값이 알파벳과 숫자로만 이루어진 문자열인지 확인합니다.
 *
 * @param {string} value - 확인할 값입니다.
 * @returns {boolean} 주어진 값이 알파벳과 숫자로만 이루어진 문자열일 경우 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * isAlphanumeric('abc'); // true
 * isAlphanumeric('123'); // true
 * isAlphanumeric('abc123'); // true
 * isAlphanumeric('abc123!'); // false
 * isAlphanumeric('abc 123'); // false
 * isAlphanumeric(''); // false
 * isAlphanumeric(😂); // false
 */

export function isAlphanumeric(value: string): boolean {
  if (!value) return false;

  const regex = /^[a-zA-Z0-9]*$/;

  return regex.test(value);
}
