import { formatNumberWithCommas } from '../../formatter/formatNumberWithCommas';
import { FormatNumberWithSymbolOptions } from './formatValueWithSymbol.types';
import { getFormattedNumberWithSymbol } from './formatValueWithSymbol.utils';

/**
 * @description 주어진 `숫자` 또는 `문자열`의 원하는 위치에 주어진 `기호`를 추가하는 함수입니다.
 *
 * - 기호는 `prefix` 또는 `suffix` 위치에 추가할 수 있습니다.
 * - 음수일 경우 기호 앞에 `-`가 추가됩니다.
 * - 기호와 값 사이에 공백 여부(`space`)를 선택할 수 있습니다.
 * - 천 단위 구분 쉼표 사용 여부(`commas`)를 선택할 수 있습니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값
 * @param {FormatNumberWithSymbolOptions} options - 포맷팅 옵션
 * @param {string} [options.symbol=''] - 추가할 기호
 * @param {'prefix' | 'suffix'} [options.position='suffix'] - 기호 위치
 * @param {boolean} [options.space=false] - 숫자와 기호 사이 공백 여부입니다.
 * @param {boolean} [options.commas=true] - 천 단위 구분 쉼표 사용 여부입니다.
 * @returns {string} 기호가 추가된 포맷팅된 문자열
 *
 * @example
 * // 옵션 없이 호출하면 문자열로 변환된 숫자를 반환합니다.
 * formatValueWithSymbol(1000) // '1,000'
 *
 * // 기호 추가 (기본값: '')
 * formatValueWithSymbol(1000, { symbol: '원' }) // '1,000원'
 *
 * // 음수 처리
 * formatValueWithSymbol(-1000, { symbol: '$', position: 'prefix' }) // '-$1,000'
 *
 * // 기호 위치 변경 (기본값: 'suffix')
 * formatValueWithSymbol(1000, { symbol: '$', position: 'prefix' }) // '$1,000'
 * formatValueWithSymbol(1000, { symbol: '$', position: 'suffix' }) // '1,000$'
 *
 * // 공백 추가 (기본값: false)
 * formatValueWithSymbol(1000, { symbol: '원',  space: true }) // '1,000 원'
 * formatValueWithSymbol(1000, { symbol: '원',  space: false }) // '1,000원'
 *
 * // 천 단위 구분 쉼표 사용 여부 (기본값: true)
 * formatValueWithSymbol(1000, { symbol: '원', commas: true }) // '1,000원'
 * formatValueWithSymbol(1000, { symbol: '원', commas: false }) // '1000원'
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
  const {
    symbol = '',
    position = 'suffix',
    space = false,
    commas = true,
  } = options;
  const valueToUse = commas ? formatNumberWithCommas(value) : String(value);
  const isNegative = valueToUse.startsWith('-');

  return getFormattedNumberWithSymbol(valueToUse, {
    symbol,
    position,
    space,
    isNegative,
  });
}
