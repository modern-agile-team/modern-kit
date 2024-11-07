/**
 * @description 전화번호 문자열이 유효한 형식인지 확인합니다.
 *
 * - 전화번호 형식은 `XXXX-XXXX`, `XXX-XXXX-XXXX`, `XXX-XXX-XXXX`, `XX-XXXX-XXXX`, `XX-XXX-XXXX` 중 하나여야 합니다.
 * - 각 부분은 `-`로 구분되어야 합니다.
 *
 * @param {string} value - 유효성을 검사할 전화번호 문자열입니다.
 * @returns {boolean} 전화번호 형식이 유효하면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * isValidPhoneNumber("010-1234-5678"); // true
 * isValidPhoneNumber("02-123-4567"); // true
 *
 * @example
 * isValidPhoneNumber("01012345678"); // false
 * isValidPhoneNumber('0-123-1234'); // false
 */
export function isValidPhoneNumber(value: string): boolean {
  const regex = /^(\d{2,3}-)?\d{3,4}-\d{4}$/;

  return regex.test(value);
}
