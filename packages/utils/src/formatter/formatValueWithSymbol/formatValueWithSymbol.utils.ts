import { FormatNumberWithSymbolOptions } from './formatValueWithSymbol.types';

/**
 * @description 주어진 문자열에 기호를 추가하는 내부 유틸리티 함수입니다.
 *
 * - 기호는 `prefix` 또는 `suffix` 위치에 추가할 수 있습니다.
 * - 음수 값의 경우 기호 앞에 `-`가 추가됩니다.
 * - 기호와 값 사이에 공백을 추가할 수 있습니다.
 *
 * @param {number | string} value - 통화 기호를 추가할 숫자 또는 문자열
 * @param {FormatNumberWithSymbolOptions & { isNegative: boolean }} options - 포맷팅 옵션
 * @param {string} [options.symbol=''] - 추가할 기호
 * @param {'prefix' | 'suffix'} [options.position='suffix'] - 기호 위치
 * @param {boolean} [options.space=false] - 숫자와 기호 사이 공백 여부
 * @returns {string} 기호가 추가된 포맷팅된 문자열
 */
export const getFormattedNumberWithSymbol = (
  value: string,
  options: FormatNumberWithSymbolOptions & {
    isNegative: boolean;
  }
): string => {
  const { symbol, position, space, isNegative } = options;

  const spaceToUse = space ? ' ' : '';

  if (position === 'prefix') {
    if (isNegative) {
      const numericPart = value.slice(1);
      return '-' + symbol + spaceToUse + numericPart;
    }
    return symbol + spaceToUse + value;
  }
  return value + spaceToUse + symbol;
};
