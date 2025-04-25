import { formatNumberWithCommas } from '../formatNumberWithCommas';
import { formatValueWithSymbol } from '../formatValueWithSymbol';
import { isNumber } from '../../validator/isNumber';

/**
 * @description 주어진 `숫자` 또는 `숫자로 이뤄진 문자열`에 달러($) 기호를 추가한 문자열을 반환하는 함수입니다.
 *
 * - 허용 할 소수점 자리수(`decimal`)를 선택할 수 있습니다. 기본값은 `0`입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값
 * @param {number} [options.decimal=0] - 소수점 자리수
 * @returns {string} 달러($) 기호가 추가된 문자열
 *
 * @example
 * formatCurrencyUSD(1234567);
 * formatCurrencyUSD('1234567');
 * // '$1,234,567'
 *
 * formatCurrencyUSD(-1234567);
 * formatCurrencyUSD('-1234567');
 * // '-$1,234,567'
 *
 * @example
 * formatCurrencyUSD(1234567.1234, { decimal: 2 });
 * // '$1,234,567.12'
 *
 * formatCurrencyUSD(-1234567.1234, { decimal: 2 });
 * // '-$1,234,567.12'
 */
export function formatCurrencyUSD(
  value: number | string,
  options: { decimal?: number } = {}
): string {
  const { decimal = 0 } = options;

  const valueToUse = isNumber(value) ? value : Number(value);
  const negativeSign = valueToUse < 0 ? '-' : '';
  const absoluteValue = Math.abs(valueToUse);

  return `${negativeSign}${formatValueWithSymbol(
    formatNumberWithCommas(absoluteValue.toFixed(decimal)),
    { prefix: '$' }
  )}`;
}
