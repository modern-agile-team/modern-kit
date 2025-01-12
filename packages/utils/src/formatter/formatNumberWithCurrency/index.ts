import { isNumber } from '../../validator/isNumber';
import { FormatNumberCurrencyOptions } from './formatNumberWithCurrency.types';
import { addCurrency } from './formatNumberWithCurrency.utils';

/**
 * @description `숫자 혹은 숫자로 이뤄진 문자열`을 주어진 `통화 기호`를 추가하는 함수입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 값
 * @param {FormatNumberCurrencyOptions} options - 포맷팅 옵션
 * @param {string} [options.symbol=''] - 통화 기호
 * @param {'prefix' | 'suffix'} [options.position='suffix'] - 통화 기호 위치
 * @param {boolean} [options.space=false] - 숫자와 통화 기호 사이 공백 여부
 * @param {boolean} [options.commas=true] - 천의 단위 구분 여부
 * @param {'KRW' | 'KRW_SYMBOL' | 'USD' | 'JPY' | 'CNY' | 'EUR'} [options.locale] - 통화 단위
 * @returns 통화 기호가 포함된 포맷팅된 문자열
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
 * formatNumberWithCurrency(1000, { symbol: '₩',  space: true }) // '1,000 원'
 *
 * // 천의 단위 구분 여부 (기본값: true)
 * formatNumberWithCurrency(1000, { symbol: '원', commas: false }) // '1000원'
 * formatNumberWithCurrency(1000, { symbol: '원', commas: true }) // '1,000원'
 *
 * // locale 사용
 * formatNumberWithCurrency(1000, { locale: 'USD' }) // '$1,000'
 * formatNumberWithCurrency(1000, { locale: 'KRW' }) // '1,000원'
 *
 * // locale 옵션이 있으면 commas 옵션을 제외한 나머지 옵션들은 무시됩니다.
 * formatNumberWithCurrency(1000, { locale: 'KRW', commas: false }) // '1000원'
 */
export function formatNumberWithCurrency(
  value: number | string,
  options: FormatNumberCurrencyOptions = {}
) {
  const {
    symbol = '',
    position = 'suffix',
    space = false,
    commas = true,
    locale,
  } = options;
  const valueToUse = isNumber(value) ? value : Number(value);
  const isNegative = valueToUse < 0;

  if (isNaN(valueToUse)) {
    throw new Error('value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.');
  }

  return addCurrency(valueToUse, {
    symbol,
    position,
    space,
    locale,
    commas,
    isNegative,
  });
}
