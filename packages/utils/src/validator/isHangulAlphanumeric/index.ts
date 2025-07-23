/**
 * @description 주어진 문자열이 한글 또는 알파벳 또는 숫자로 이루어져 있는지 확인합니다.
 *
 * @param {string} value - 확인할 문자열
 * @returns {boolean} 문자열이 한글/알파벳/숫자로 이루어져 있는지 여부
 *
 * @example
 * isHangulAlphanumeric('안녕하세요'); // true
 * isHangulAlphanumeric('Hello123'); // true
 * isHangulAlphanumeric('123'); // true
 *
 * @example
 * isHangulAlphanumeric('!@#'); // false
 * isHangulAlphanumeric(''); // false
 */
export function isHangulAlphanumeric(value: string): boolean {
  return /^[가-힣a-zA-Z0-9]+$/.test(value);
}
