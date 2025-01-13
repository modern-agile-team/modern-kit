/**
 * @description 주어진 `숫자` 또는 `문자열`에 포함된 숫자를 천 단위로 `separator`를 추가한 문자열을 반환하는 함수입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값입니다.
 * @param {string} [separator=','] - 천 단위 구분 기호입니다. (기본값: `,`)
 * @returns {string} 포맷팅된 문자열
 *
 * @example
 * // 숫자
 * formatNumberWithSeparator(1234567.89112); // '1,234,567.89112'
 *
 * // 숫자로 이루어진 문자열
 * formatNumberWithSeparator('1234567.89112'); // '1,234,567.89112'
 *
 * // 숫자를 포함한 일반적인 문자열
 * formatNumberWithSeparator('1433만 4567'); // '1,433만 4,567'
 *
 * @example
 * // separator 변경
 * formatNumberWithSeparator('1234567', ' ') // '1 234 567'
 */
export function formatNumberWithSeparator(
  value: number | string,
  separator: string = ','
): string {
  return String(value).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separator);
}
