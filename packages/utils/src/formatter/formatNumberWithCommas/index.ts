/**
 * @description `숫자로 이루어진 문자열` 또는 `숫자`를 입력하면 천 단위로 `(,)comma`를 추가한 문자열을 반환하는 함수입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값.
 * @returns {string} 포맷팅된 숫자 문자열.
 *
 * @example
 * // 숫자
 * formatNumberWithCommas(1234567.89112); // '1,234,567.89112'
 *
 * // 숫자로 이뤄진 문자열
 * formatNumberWithCommas('1234567.89112');
 * // '1,234,567.89112'
 *
 * // 일반적인 문자열
 * formatNumberWithCommas('1433만 4567');
 * // '1,433만 4,567'
 */
export function formatNumberWithCommas(value: number | string): string {
  return String(value).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}
