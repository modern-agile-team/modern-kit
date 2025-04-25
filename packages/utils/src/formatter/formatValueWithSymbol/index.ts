/**
 * @description 주어진 `숫자` 또는 `문자열`에 주어진 `기호`를 추가하고, `기호의 위치`를 지정합니다.
 *
 * @param {number | string} value - 기호를 추가할 숫자 또는 문자열
 * @param {FormatValueWithSymbolOptions} options - 기호와 위치 옵션
 * @param {string} [options.prefix=''] - 접두사에 추가할 기호
 * @param {string} [options.suffix=''] - 접미사에 추가할 기호
 * @returns {string} 기호가 추가된 문자열
 *
 * @example
 * formatValueWithSymbol(1234567, { suffix: '원' });
 * // '1234567원'
 *
 * formatValueWithSymbol(1234567, { prefix: '$' });
 * // '$1234567'
 *
 * formatValueWithSymbol(1234567, { prefix: '*', suffix: '@' });
 * // '*1234567@'
 */
export function formatValueWithSymbol(
  value: number | string,
  options: {
    prefix?: string;
    suffix?: string;
  }
): string {
  const { prefix = '', suffix = '' } = options;

  return `${prefix}${value}${suffix}`;
}
