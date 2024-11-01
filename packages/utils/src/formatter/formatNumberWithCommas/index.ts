import { isNumber } from '../../validator';

interface FormatNumberWithCommasOptions {
  maximumDecimalDigits?: Intl.NumberFormatOptions['maximumFractionDigits'];
  minimumDecimalDigits?: Intl.NumberFormatOptions['minimumFractionDigits'];
}

/**
 * @description 최대 소수점 자릿수를 가져오는 함수입니다.
 */
const getMaximumDecimalDigits = (
  maximumDecimalDigits: number,
  minimumDecimalDigits: number
) => {
  return maximumDecimalDigits < minimumDecimalDigits
    ? minimumDecimalDigits
    : maximumDecimalDigits;
};

/**
 * @description 숫자에 천 단위 콤마를 추가하고, 소수점 자릿수를 지정하여 포맷팅하는 함수입니다.
 *
 * @param {number} value - 포맷팅할 숫자 값.
 * @param {FormatNumberWithCommasOptions} options - 숫자 포맷팅 옵션.
 * @param {number} [options.maximumDecimalDigits=3] - 표시할 소수점 이하 최대 자릿수. 기본값은 3입니다.
 * @param {number} [options.minimumDecimalDigits=0] - 표시할 소수점 이하 최소 자릿수. 기본값은 0입니다.
 *
 * @returns {string} 포맷팅된 숫자 문자열.
 *
 *  @example
 * formatNumberWithCommas(5300); // 5,300
 * formatNumberWithCommas(1234567.891);
 * // '1,234,567.891'
 *
 * formatNumberWithCommas("5300"); // 5,300
 * formatNumberWithCommas("1234567.891");
 * // '1,234,567.891'
 *
 * @example
 * formatNumberWithCommas(1234567.891, { maximumDigits: 2 });
 * // '1,234,567.89'
 */
export function formatNumberWithCommas(
  value: number | string,
  options: FormatNumberWithCommasOptions = {}
): string {
  const { maximumDecimalDigits = 3, minimumDecimalDigits = 0 } = options;
  const valueToUse = isNumber(value) ? value : Number(value);

  if (isNaN(valueToUse)) {
    throw new Error('value는 숫자 혹은 숫자로만 이뤄진 문자열이여야 합니다.');
  }

  return valueToUse.toLocaleString('en-US', {
    maximumFractionDigits: getMaximumDecimalDigits(
      maximumDecimalDigits,
      minimumDecimalDigits
    ),
    minimumFractionDigits: minimumDecimalDigits,
  });
}
