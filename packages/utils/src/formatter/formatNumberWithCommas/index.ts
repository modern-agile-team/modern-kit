import { isNumber } from '../../validator/isNumber';

/**
 * @description 주어진 `숫자` 또는 `숫자로 이뤄진 문자열`에 천 단위로 `(,)comma`를 추가한 문자열을 반환하는 함수입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값.
 * @returns {string} 포맷팅된 숫자 문자열.
 *
 * @example
 * // 숫자
 * formatNumberWithCommas(1234567.89112);
 * // '1,234,567.89112'
 *
 * // 숫자로 이뤄진 문자열
 * formatNumberWithCommas('1234567.89112');
 * // '1,234,567.89112'
 */
export function formatNumberWithCommas(value: number | string): string {
  const valueToUse = isNumber(value) ? value : Number(value);

  if (isNaN(valueToUse)) {
    throw new Error('value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.');
  }

  const parts = String(valueToUse).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}
