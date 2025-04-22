import { formatValueWithSymbol } from '../formatValueWithSymbol';
import { formatNumberWithUnits } from '../formatNumberWithUnits';

type FormatCurrencyKRWWithUnitsOptions = {
  commas?: boolean;
  decimal?: number;
};

const KRW_UNITS = [
  { unit: '조', value: 1_000_000_000_000 },
  { unit: '억', value: 100_000_000 },
  { unit: '만', value: 10_000 },
];

const KRW_SYMBOL_OPTIONS = {
  symbol: '원',
  position: 'suffix',
} as const;

/**
 * @description 주어진 숫자 또는 문자열을 단위(조, 억, 만)로 나누고, "원" 문자열이 추가된 포맷팅한 문자열을 반환합니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 또는 문자열
 * @returns {string} 단위(조, 억, 만)로 나누고, "원" 문자열이 추가된 포맷팅된 문자열
 *
 * @example
 * formatCurrencyKRWWithUnits(1234567890123);
 * formatCurrencyKRWWithUnits('1234567890123');
 * // '1조 2,345억 6,789만 123원'
 *
 * formatCurrencyKRWWithUnits(123456789);
 * formatCurrencyKRWWithUnits('123456789');
 * // '1억 2,345만 6,789원'
 *
 * @example
 * formatCurrencyKRWWithUnits(123456789, { commas: false });
 * formatCurrencyKRWWithUnits('123456789', { commas: false });
 * // '1억 2345만 6789원'
 *
 * @example
 * formatCurrencyKRWWithUnits(123456789.12, { decimal: 2 });
 * formatCurrencyKRWWithUnits('123456789.12', { decimal: 2 });
 * // '1억 2,345만 6,789.12원'
 */
export function formatCurrencyKRWWithUnits(
  value: number | string,
  options?: FormatCurrencyKRWWithUnitsOptions
): string {
  return formatValueWithSymbol(
    formatNumberWithUnits(value, { units: KRW_UNITS, ...options }),
    KRW_SYMBOL_OPTIONS
  );
}
