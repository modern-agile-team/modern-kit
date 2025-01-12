import { formatNumberWithCommas } from '../../formatter/formatNumberWithCommas';
import { FormatNumberCurrencyOptions } from './formatNumberWithCurrency.types';

const LOCALE_CURRENCY_MAP = {
  KRW: { symbol: '원', position: 'suffix', space: false },
  KRW_SYMBOL: { symbol: '₩', position: 'suffix', space: false },
  USD: { symbol: '$', position: 'prefix', space: false },
  JPY: { symbol: '¥', position: 'prefix', space: false },
  CNY: { symbol: '¥', position: 'prefix', space: false },
  EUR: { symbol: '€', position: 'prefix', space: false },
} as const;

/**
 * @description 통화 옵션을 가져오는 함수
 *
 * @param {Omit<FormatNumberCurrencyOptions, 'commas'>} options - 통화 옵션
 * @returns {Omit<FormatNumberCurrencyOptions, 'locale' | 'commas'>} locale을 제외한 통화 옵션
 */
const getCurrencyOption = (
  options: Omit<FormatNumberCurrencyOptions, 'commas'>
): Omit<FormatNumberCurrencyOptions, 'locale' | 'commas'> => {
  const { symbol, position, space, locale } = options;

  if (locale) {
    if (!LOCALE_CURRENCY_MAP[locale]) {
      throw new Error('유효하지 않은 locale 입니다.');
    }

    return LOCALE_CURRENCY_MAP[locale];
  }

  return { symbol, position, space };
};

/**
 * @description 숫자에 통화 기호를 추가하는 함수입니다.
 *
 * @param {number | string} value - 통화 기호를 추가할 숫자 또는 문자열
 * @param {FormatNumberCurrencyOptions & { isNegative: boolean }} currencyOption - 통화 단위 옵션
 * @param {string} [currencyOption.symbol=''] - 통화 기호
 * @param {'prefix' | 'suffix'} [currencyOption.position='suffix'] - 통화 기호 위치
 * @param {boolean} [currencyOption.space=false] - 숫자와 통화 기호 사이 공백 여부
 * @returns {string} 통화 기호가 추가된 문자열
 */
export const getFormattedNumberWithCurrency = (
  value: number,
  options: FormatNumberCurrencyOptions & { isNegative: boolean }
): string => {
  const { commas, ...restOption } = options;
  const { symbol, position, space } = getCurrencyOption(restOption);

  const valueToUse = commas ? formatNumberWithCommas(value) : String(value);

  if (position === 'prefix') {
    // 음수 처리
    if (options.isNegative) {
      const numericPart = valueToUse.slice(1);
      return '-' + symbol + (space ? ' ' : '') + numericPart;
    }
    return symbol + (space ? ' ' : '') + valueToUse;
  }
  return valueToUse + (space ? ' ' : '') + symbol;
};
