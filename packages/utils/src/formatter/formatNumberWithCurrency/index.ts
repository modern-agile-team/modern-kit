import {
  formatNumberWithUnits,
  FormatNumberWithUnitsOptions,
} from '../formatNumberWithUnits';

interface CurrencyOptions {
  currency: string;
  position: 'prefix' | 'suffix';
}

type FormatNumberCurrencyOptions = FormatNumberWithUnitsOptions &
  Partial<CurrencyOptions>;

/**
 * @description 숫자에 통화 단위를 추가하는 함수입니다.
 *
 * @param {number | string} value - 통화 단위를 추가할 숫자 문자열
 * @param {CurrencyOptions} currencyOption - 통화 단위 옵션
 * @param {string} [currencyOption.currency=''] - 통화 단위
 * @param {string} [currencyOption.position='suffix'] - 통화 단위 위치
 * @returns {string} 통화 단위가 추가된 숫자 문자열
 */
export const addCurrency = (
  value: string,
  currencyOption: CurrencyOptions
): string => {
  const { currency, position } = currencyOption;

  if (position === 'prefix') {
    return currency + value;
  }
  return value + currency;
};

/**
 * @description 숫자 값을 단위 별로 나누고, 통화 기호와 함께 포맷팅하는 함수입니다.
 *
 * @modern-kit/utils의 `formatNumberWithUnits`를 확장했기 때문에 해당 함수 옵션을 함께 활용 할 수 있습니다.
 *
 * @see https://modern-agile-team.github.io/modern-kit/docs/utils/formatter/formatNumberWithUnits
 *
 * @param {number | string} value - 포맷팅할 숫자 값
 * @param {FormatNumberCurrencyOptions} options - 포맷팅 옵션
 * @param {string} [options.currency=''] - 통화 기호
 * @param {string} [options.position='suffix'] - 통화 기호 위치 ('prefix' | 'suffix')
 * @param {Unit[]} [options.units=[]] - 사용할 단위 배열. 직접 정의해서 사용할 수 있습니다.
 * @param {boolean} [options.commas=true] - 천 단위 구분 쉼표 사용 여부
 * @param {number} [options.floorUnit=1] - 버림 단위(기본값: 1). 버림 단위보다 작은 숫자는 '0'으로 반환합니다.
 * @param {boolean} [options.space=true] - 단위 사이 공백 추가 여부
 * @returns 통화 기호가 포함된 포맷팅된 문자열
 *
 * @example
 * // 기본 동작
 * formatNumberWithCurrency(1000, { currency: '$', position: 'prefix' }) // '$1,000'
 * formatNumberWithCurrency(1000, { currency: '원', position: 'suffix' }) // '1,000원'
 *
 * @example
 * // 단위 사이 공백 추가
 * formatNumberWithCurrency(12345, { currency: '원', position: 'suffix', space: false }) // '1만2,345원'
 * formatNumberWithCurrency(12345, { currency: '원', position: 'suffix', space: true }) // '1만 2,345원'
 *
 * @example
 * // 쉼표 사용 여부
 * formatNumberWithCurrency(12345, { currency: '원', position: 'suffix', commas: false }) // '1만 2345원'
 * formatNumberWithCurrency(12345, { currency: '원', position: 'suffix', commas: true }) // '1만 2,345원'
 *
 * @example
 * // 버림 단위
 * formatNumberWithCurrency(12345, { currency: '원', position: 'suffix', floorUnit: 10000 }) // '1만원'
 *
 * @example
 * // 사용자 정의 단위
 * const customUnits = [
 *   { unit: 'K', value: 1000 },
 *   { unit: 'M', value: 1000000 },
 * ];
 *
 * formatNumberWithCurrency(1234567, {
 *   units: customUnits,
 *   currency: '$',
 *   position: 'prefix',
 *   floorUnit: 1000000
 * }) // '$1M'
 */
export function formatNumberWithCurrency(
  value: number | string,
  options: FormatNumberCurrencyOptions = {}
) {
  const { currency = '', position = 'suffix', ...restOptions } = options;

  return addCurrency(formatNumberWithUnits(value, restOptions), {
    currency,
    position,
  });
}
