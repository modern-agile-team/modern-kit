import { formatValueWithSymbol } from '../formatValueWithSymbol';
import { formatNumberWithCommas } from '../formatNumberWithCommas';
import { isNumber } from '../../validator/isNumber';

const getKRWSymbolOptions = (isSymbol: boolean) => {
  return isSymbol
    ? {
        prefix: '₩',
      }
    : {
        suffix: '원',
      };
};
/**
 * @description 주어진 `숫자` 또는 `숫자로 이뤄진 문자열`에 기호를 추가한 문자열을 반환하는 함수입니다.
 *
 * - "원"이 아닌 통화 기호(₩)로 표기할 경우 `isSymbol` 옵션을 `true`로 설정할 수 있습니다. 기본값은 `false`입니다.
 * - 허용 할 소수점 자리수(`decimal`)를 선택할 수 있습니다. 기본값은 `0`입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값.
 * @param {boolean} [options.isSymbol=false] - 통화 기호 사용 여부
 * @param {number} [options.decimal=0] - 소수점 자리수
 * @returns {string} 기호가 추가된 문자열.
 *
 * @example
 * formatCurrencyKRW(1234567);
 * formatCurrencyKRW('1234567');
 * // '1,234,567원'
 *
 * formatCurrencyKRW(-1234567);
 * formatCurrencyKRW('-1234567');
 * // '-1,234,567원'
 *
 * @example
 * formatCurrencyKRW(1234567.1234, { decimal: 2 });
 * // '1,234,567.12원'
 *
 * formatCurrencyKRW(-1234567.1234, { decimal: 2 });
 * // '-1,234,567.12원'
 *
 * @example
 * formatCurrencyKRW(1234567, { isSymbol: true });
 * // '₩1,234,567'
 *
 * formatCurrencyKRW(-1234567, { isSymbol: true });
 * // '-₩1,234,567'
 */
export function formatCurrencyKRW(
  value: number | string,
  options: { isSymbol?: boolean; decimal?: number } = {}
): string {
  const { isSymbol = false, decimal = 0 } = options;

  const valueToUse = isNumber(value) ? value : Number(value);
  const negativeSign = valueToUse < 0 ? '-' : '';
  const absoluteValue = Math.abs(valueToUse);

  return `${negativeSign}${formatValueWithSymbol(
    formatNumberWithCommas(absoluteValue.toFixed(decimal)),
    getKRWSymbolOptions(isSymbol)
  )}`;
}
