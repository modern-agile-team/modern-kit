import { formatValueWithSymbol } from '../formatValueWithSymbol';
import { formatNumberWithUnits } from '../formatNumberWithUnits';

const KRW_UNITS = [
  { unit: '조', value: 1_000_000_000_000 },
  { unit: '억', value: 100_000_000 },
  { unit: '만', value: 10_000 },
] as const;

/**
 * @description 주어진 숫자 또는 문자열을 (조/억/만)단위로 나누고, "원" 문자를 접미사로 붙여 포맷팅한 문자열을 반환합니다.
 *
 * - 허용 할 소수점 자리수(`decimal`)를 선택할 수 있습니다. 기본값은 `0`입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 또는 문자열
 * @param {number} [options.decimal=0] - 소수점 자리수
 *
 * @returns {string} 포맷팅된 문자열
 *
 * @example
 * formatCurrencyKRWWithUnits(1234567891234);
 * formatCurrencyKRWWithUnits('1234567891234');
 * // '1조 2,345억 6,789만 1,234원'
 *
 * formatCurrencyKRWWithUnits(-123456789);
 * formatCurrencyKRWWithUnits('-123456789');
 * // '-1억 2,345만 6,789원'
 *
 * @example
 * formatCurrencyKRWWithUnits(123456789.1234, { decimal: 2 });
 * // '1조 2,345억 6,789만 1,234.12원'
 */
export function formatCurrencyKRWWithUnits(
  value: number | string,
  options: { decimal?: number } = {}
): string {
  const { decimal = 0 } = options;
  const unitsOptions = { units: KRW_UNITS, commas: true, decimal };

  return formatValueWithSymbol(formatNumberWithUnits(value, unitsOptions), {
    suffix: '원',
  });
}
