import { formatValueWithSymbol } from '../formatValueWithSymbol';
import { formatNumberWithCommas } from '../formatNumberWithCommas';

const KRW_SYMBOL_OPTIONS = {
  symbol: '원',
  position: 'suffix',
} as const;

/**
 * @description 주어진 `숫자` 또는 `숫자로 이뤄진 문자열`에 "원" 문자열을 추가한 문자열을 반환하는 함수입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값.
 * @returns {string} "원" 문자열이 추가된 문자열.
 *
 * @example
 * formatCurrencyKRW(1234567);
 * formatCurrencyKRW('1234567');
 * // '1,234,567원'
 *
 * formatCurrencyKRW(1234567.89112);
 * formatCurrencyKRW('1234567.89112');
 * // '1,234,567.89112원'
 *
 * formatCurrencyKRW(-1234567.89112);
 * formatCurrencyKRW('-1234567.89112');
 * // '-1,234,567.89112원'
 */
export function formatCurrencyKRW(value: number | string): string {
  return formatValueWithSymbol(
    formatNumberWithCommas(value),
    KRW_SYMBOL_OPTIONS
  );
}
