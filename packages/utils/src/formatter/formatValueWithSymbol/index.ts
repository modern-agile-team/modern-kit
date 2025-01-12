import { FormatNumberWithSymbolOptions } from './formatValueWithSymbol.types';
import { getFormattedNumberWithSymbol } from './formatValueWithSymbol.utils';

/**
 * @description 주어진 `숫자` 또는 `문자열`의 원하는 위치에 주어진 `기호`를 추가하는 함수입니다.
 *
 * - 기호는 `prefix` 또는 `suffix` 위치에 추가할 수 있습니다.
 * - 음수일 경우 기호 앞에 `-`가 추가됩니다.
 * - 기호와 값 사이에 `공백`을 추가할 수 있습니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값
 * @param {FormatNumberWithSymbolOptions} options - 포맷팅 옵션
 * @param {string} [options.symbol=''] - 추가할 기호
 * @param {'prefix' | 'suffix'} [options.position='suffix'] - 기호 위치
 * @param {boolean} [options.space=false] - 숫자와 기호 사이 공백 여부
 * @returns {string} 기호가 추가된 포맷팅된 문자열
 *
 * @example
 * // 옵션 없이 호출하면 문자열로 변환된 숫자를 반환합니다.
 * formatValueWithSymbol(1000) // '1000'
 *
 * // 기호 추가 (기본값: '')
 * formatValueWithSymbol(1000, { symbol: '원' }) // '1000원'
 *
 * // 음수 처리
 * formatValueWithSymbol(-1000, { symbol: '$', position: 'prefix' }) // '-$1000'
 *
 * // 기호 위치 변경 (기본값: 'suffix')
 * formatValueWithSymbol(1000, { symbol: '$', position: 'prefix' }) // '$1000'
 *
 * // 공백 추가 (기본값: false)
 * formatValueWithSymbol(1000, { symbol: '원',  space: true }) // '1000 원'
 *
 * // 문자열 처리
 * formatValueWithSymbol('1000', { symbol: '원' }) // '1000원'
 * formatValueWithSymbol(123만, { symbol: '원' }) // '123만원'
 * formatValueWithSymbol('1,234,567', { symbol: '원' }) // '1,234,567원'
 */
export function formatValueWithSymbol(
  value: number | string,
  options: FormatNumberWithSymbolOptions = {}
): string {
  const { symbol = '', position = 'suffix', space = false } = options;
  const valueToUse = String(value).trim();
  const isNegative = valueToUse.startsWith('-');

  return getFormattedNumberWithSymbol(valueToUse, {
    symbol,
    position,
    space,
    isNegative,
  });
}
