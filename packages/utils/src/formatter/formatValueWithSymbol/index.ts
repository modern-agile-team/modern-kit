/**
 * @description 주어진 숫자 또는 문자열에 주어진 기호를 추가하고, 기호의 위치를 지정합니다.
 *
 * @param {number | string} value - 기호를 추가할 숫자 또는 문자열
 * @param {Object} options - 기호와 위치 옵션
 * @param {string} options.symbol - 기호
 * @param {'prefix' | 'suffix' | 'both'} [options.position='suffix'] - 기호의 위치
 * @returns {string} 기호가 추가된 문자열
 *
 * @example
 * formatValueWithSymbol(1234567, { symbol: '원', position: 'suffix' });
 * // '1234567원'
 *
 * formatValueWithSymbol(1234567, { symbol: '$', position: 'prefix' });
 * // '$1234567'
 *
 * formatValueWithSymbol(1234567, { symbol: '*', position: 'both' });
 * // '*1234567*'
 */
export function formatValueWithSymbol(
  value: number | string,
  options: { symbol: string; position?: 'prefix' | 'suffix' | 'both' }
): string {
  const { symbol, position = 'suffix' } = options;

  if (position === 'prefix') {
    return `${symbol}${value}`;
  }

  if (position === 'suffix') {
    return `${value}${symbol}`;
  }

  return `${symbol}${value}${symbol}`;
}
