import { formatNumberWithCommas } from '../formatNumberWithCommas';
import { formatValueWithSymbol } from '../formatValueWithSymbol';
import { isNumber } from '../../validator/isNumber';

const USD_SYMBOL_OPTIONS = {
  symbol: '$',
  position: 'prefix',
} as const;

/**
 * @description 주어진 `숫자` 또는 `숫자로 이뤄진 문자열`에 달러($) 기호를 추가한 문자열을 반환하는 함수입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값.
 * @returns {string} 달러($) 기호가 추가된 문자열.
 *
 * @example
 * formatCurrencyUSD(1234567.89112);
 * // '$1,234,567.89112'
 *
 * formatCurrencyUSD(-1234567.89112);
 * // '-$1,234,567.89112'
 */
export function formatCurrencyUSD(value: number | string): string {
  const isNegative = isNumber(value) && value < 0;

  if (isNegative) {
    return `-${formatValueWithSymbol(
      formatNumberWithCommas(Math.abs(value)),
      USD_SYMBOL_OPTIONS
    )}`;
  }

  return formatValueWithSymbol(
    formatNumberWithCommas(value),
    USD_SYMBOL_OPTIONS
  );
}
