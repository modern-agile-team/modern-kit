/**
 * @description 주어진 문자열이 한글로 이루어져 있는지 확인합니다.
 *
 * @param {string} value - 확인할 문자열
 * @returns {boolean} 문자열이 한글로 이루어져 있는지 여부
 *
 * @example
 * isHangul('안녕하세요'); // true
 *
 * @example
 * isHangul('Hello'); // false
 * isHangul('123'); // false
 * isHangul('!@#'); // false
 * isHangul(''); // false
 */
export function isHangul(value: string): boolean {
  return /^[가-힣]+$/.test(value);
}
