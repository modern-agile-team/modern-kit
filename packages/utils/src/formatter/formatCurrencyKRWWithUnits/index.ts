import { formatValueWithSymbol } from '../formatValueWithSymbol';
import { formatNumberWithUnits } from '../formatNumberWithUnits';

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
 * @description 주어진 숫자 또는 문자열을 단위와 통화 기호로 포맷팅한 문자열을 반환합니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 또는 문자열
 * @returns {string} 단위와 통화 기호가 추가된 포맷팅된 문자열
 *
 * @example
 * formatCurrencyKRWWithUnits(1234567890123);
 * // '1조 2,345억 6,789만 123원'
 *
 * formatCurrencyKRWWithUnits(123456789);
 * // '1억 2,345만 6,789원'
 */
export function formatCurrencyKRWWithUnits(value: number | string): string {
  return formatValueWithSymbol(
    formatNumberWithUnits(value, { units: KRW_UNITS }),
    KRW_SYMBOL_OPTIONS
  );
}
