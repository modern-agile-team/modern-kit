import { isNumber } from '../../validator/isNumber';
import { LOCALE_CURRENCY_MAP } from './formatNumberWithCurrency.constants';
import {
  FormatNumberCurrencyOptions,
  Locale,
} from './formatNumberWithCurrency.types';
import { getFormattedNumberWithCurrency } from './formatNumberWithCurrency.utils';

/**
 * @description `숫자 혹은 숫자로 이뤄진 문자열`을 주어진 `통화 기호`를 추가하는 함수입니다.
 *
 * 옵션이 없으면 기본값을 바탕으로 포맷팅됩니다.
 * (기본 값: symbol: '', position: 'suffix', space: false, commas: true)
 *
 * @param {number | string} value - 포맷팅할 숫자 값
 * @returns {string} 통화 기호가 포함된 포맷팅된 문자열
 *
 * @example
 * // 기본 사용법
 * formatNumberWithCurrency(1000) // '1,000'
 * formatNumberWithCurrency(-1000) // '-1,000'
 */
export function formatNumberWithCurrency(value: number | string): string;

/**
 * @description `숫자 혹은 숫자로 이뤄진 문자열`을 주어진 `통화 기호`를 추가하는 함수입니다.
 *
 * `locale` 옵션을 제외한, `기본 옵션`이 주어지면 주어진 옵션에 따라 포맷팅됩니다.
 * (기본 옵션: `symbol`, `position`, `space`, `commas`)
 *
 * @param {number | string} value - 포맷팅할 숫자 값
 * @param {Omit<FormatNumberCurrencyOptions, 'locale'>} options - 포맷팅 옵션
 * @param {string} [options.symbol=''] - 통화 기호
 * @param {'prefix' | 'suffix'} [options.position='suffix'] - 통화 기호 위치
 * @param {boolean} [options.space=false] - 숫자와 통화 기호 사이 공백 여부
 * @param {boolean} [options.commas=true] - 천의 단위 구분 여부
 * @returns {string} 통화 기호가 포함된 포맷팅된 문자열
 *
 * @example
 * // 통화 기호(symbol)
 * formatNumberWithCurrency(1000, { symbol: '원' }) // '1,000원'
 * formatNumberWithCurrency(1000.123, { symbol: '원' }) // '1,000.123원'
 * formatNumberWithCurrency(-1000, { symbol: '원' }) // '-1,000.123원'
 *
 * @example
 * // 통화 기호 위치(position)
 * formatNumberWithCurrency(1000, { symbol: '$', position: 'prefix' }) // '$1,000'
 *
 * @example
 * // 기호와 숫자 사이 공백(space)
 * formatNumberWithCurrency(1000, { symbol: '원',  space: true }) // '1,000 원'
 *
 * @example
 * // 천의 단위 구분 여부(commas)
 * formatNumberWithCurrency(1000, { symbol: '원', commas: false }) // '1000원'
 * formatNumberWithCurrency(1000, { symbol: '원', commas: true }) // '1,000원'
 *
 */
export function formatNumberWithCurrency(
  value: number | string,
  options: Omit<FormatNumberCurrencyOptions, 'locale'>
): string;

/**
 * @description `숫자 혹은 숫자로 이뤄진 문자열`을 주어진 `통화 기호`를 추가하는 함수입니다.
 *
 * `locale` 옵션이 있으면 `locale` 형식에 따라 포맷팅됩니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값
 * @param {{ locale: Locale }} options - 포맷팅 옵션
 * @param {Locale} [options.locale] - 통화 단위
 * @returns {string} 통화 기호가 포함된 포맷팅된 문자열
 *
 * @example
 * // locale 옵션 적용
 * formatNumberWithCurrency(1000, { locale: 'en-US' }) // '$1,000'
 * formatNumberWithCurrency(1000, { locale: 'ko-KR' }) // '₩1,000'
 * formatNumberWithCurrency(1000, { locale: 'ja-JP' }) // '￥1,000'
 *
 * // 소수점 처리
 * formatNumberWithCurrency(1000.123, { locale: 'en-US' }) // '$1,000.123'
 * formatNumberWithCurrency(1000.123, { locale: 'ko-KR' }) // '₩1,000.123'
 * formatNumberWithCurrency(1000.123, { locale: 'ja-JP' }) // '￥1,000.123'
 */
export function formatNumberWithCurrency(
  value: number | string,
  options: { locale: Locale }
): string;

/**
 * @description `숫자 혹은 숫자로 이뤄진 문자열`을 주어진 `통화 기호`를 추가하는 함수입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값
 * @param {FormatNumberCurrencyOptions} options - 포맷팅 옵션
 * @param {string} [options.symbol=''] - 통화 기호
 * @param {'prefix' | 'suffix'} [options.position='suffix'] - 통화 기호 위치
 * @param {boolean} [options.space=false] - 숫자와 통화 기호 사이 공백 여부
 * @param {boolean} [options.commas=true] - 천의 단위 구분 여부
 * @param {Locale} [options.locale] - 통화 단위
 * @returns {string} 통화 기호가 포함된 포맷팅된 문자열
 *
 * @example
 * // 기본 사용법
 * formatNumberWithCurrency(1000) // '1,000'
 *
 * // 통화 기호 추가 (기본값: '')
 * formatNumberWithCurrency(1000, { symbol: '원' }) // '1,000원'
 *
 * // 음수 처리
 * formatNumberWithCurrency(-1000, { symbol: '$', position: 'prefix' }) // '-$1,000'
 *
 * // 숫자로 이뤄진 문자열 허용
 * formatNumberWithCurrency('1000', { symbol: '원' }) // '1,000원'
 *
 * @example
 * // 통호 기호 위치 변경 (기본값: 'suffix')
 * formatNumberWithCurrency(1000, { symbol: '$', position: 'prefix' }) // '$1,000'
 *
 * // 공백 추가 (기본값: false)
 * formatNumberWithCurrency(1000, { symbol: '원',  space: true }) // '1,000 원'
 *
 * // 천의 단위 구분 여부 (기본값: true)
 * formatNumberWithCurrency(1000, { symbol: '원', commas: false }) // '1000원'
 * formatNumberWithCurrency(1000, { symbol: '원', commas: true }) // '1,000원'
 *
 * @example
 * // locale 옵션 적용
 * // locale 옵션이 있으면 그 외 옵션들은 무시됩니다.
 * formatNumberWithCurrency(1000, { locale: 'en-US' }) // '$1,000'
 * formatNumberWithCurrency(1000, { locale: 'ko-KR' }) // '₩1,000'
 * formatNumberWithCurrency(1000, { locale: 'ko-KR-UNIT' }) // '1,000원'
 */
export function formatNumberWithCurrency(
  value: number | string,
  options: FormatNumberCurrencyOptions = {}
): string {
  const {
    symbol = '',
    position = 'suffix',
    space = false,
    commas = true,
    locale,
  } = options;
  const valueToUse = isNumber(value) ? value : Number(value);
  const isNegative = valueToUse < 0;

  // 에러 처리
  if (isNaN(valueToUse)) {
    throw new Error('value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.');
  }

  // locale 옵션 처리
  if (locale) {
    if (!LOCALE_CURRENCY_MAP[locale]) {
      throw new Error('유효하지 않은 locale 입니다.');
    }

    return valueToUse.toLocaleString(locale, {
      style: 'currency',
      currency: LOCALE_CURRENCY_MAP[locale].currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 20,
    });
  }

  return getFormattedNumberWithCurrency(valueToUse, {
    symbol,
    position,
    space,
    commas,
    isNegative,
  });
}
