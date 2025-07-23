/**
 * @description 주어진 문자열이 알파벳으로 이루어져 있는지 확인합니다.
 *
 * @param {string} value - 확인할 문자열
 * @returns {boolean} 문자열이 알파벳으로 이루어져 있는지 여부
 *
 * @example
 * isAlphabet('Hello'); // true
 *
 * @exmaple
 * isAlphabet('안녕하세요'); // false
 * isAlphabet('123'); // false
 * isAlphabet('!@#'); // false
 * isAlphabet(''); // false
 */
export function isAlphabet(value: string): boolean {
  return /^[a-zA-Z]+$/.test(value);
}
