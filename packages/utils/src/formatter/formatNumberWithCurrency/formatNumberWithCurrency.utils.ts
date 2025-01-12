import { formatNumberWithCommas } from '../../formatter/formatNumberWithCommas';
import { FormatNumberCurrencyOptions } from './formatNumberWithCurrency.types';

/**
 * @description 숫자에 통화 기호를 추가하는 함수입니다.
 *
 * @param {number | string} value - 통화 기호를 추가할 숫자 또는 문자열
 * @param {FormatNumberCurrencyOptions & { isNegative: boolean }} options - 통화 단위 옵션
 * @param {string} [options.symbol=''] - 통화 기호
 * @param {'prefix' | 'suffix'} [options.position='suffix'] - 통화 기호 위치
 * @param {boolean} [options.space=false] - 숫자와 통화 기호 사이 공백 여부
 * @returns {string} 통화 기호가 추가된 문자열
 */
export const getFormattedNumberWithCurrency = (
  value: number,
  options: FormatNumberCurrencyOptions & {
    isNegative: boolean;
  }
): string => {
  const { symbol, position, space, commas, isNegative } = options;

  const valueToUse = commas ? formatNumberWithCommas(value) : String(value);

  if (position === 'prefix') {
    // 음수 처리
    if (isNegative) {
      const numericPart = valueToUse.slice(1);
      return '-' + symbol + (space ? ' ' : '') + numericPart;
    }
    return symbol + (space ? ' ' : '') + valueToUse;
  }
  return valueToUse + (space ? ' ' : '') + symbol;
};
