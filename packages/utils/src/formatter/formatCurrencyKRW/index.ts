import { formatValueWithSymbol } from '../formatValueWithSymbol';
import { formatNumberWithCommas } from '../formatNumberWithCommas';

const getKRWSymbol = (isSymbol: boolean) => {
  return isSymbol
    ? ({
        symbol: '₩',
        position: 'prefix',
      } as const)
    : ({
        symbol: '원',
        position: 'suffix',
      } as const);
};

/**
 * @description 주어진 `숫자` 또는 `숫자로 이뤄진 문자열`에 기호를 추가한 문자열을 반환하는 함수입니다.
 *
 * `isSymbol` 옵션을 통해 `통화 기호(₩)`를 추가할 수 있습니다. 설정하지 않을 경우 "원" 문자열이 접미사에 추가됩니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값.
 * @param {boolean} [options.isSymbol=false] - 통화 기호 사용 여부
 * @returns {string} 기호가 추가된 문자열.
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
 * formatCurrencyKRW(-1234567);
 * formatCurrencyKRW('-1234567');
 * // '-1,234,567원'
 *
 * @example
 * formatCurrencyKRW(1234567, { isSymbol: true });
 * formatCurrencyKRW('1234567', { isSymbol: true });
 * // '₩1,234,567'
 */
export function formatCurrencyKRW(
  value: number | string,
  options: { isSymbol?: boolean } = {}
): string {
  const { isSymbol = false } = options;

  return formatValueWithSymbol(
    formatNumberWithCommas(value),
    getKRWSymbol(isSymbol)
  );
}
