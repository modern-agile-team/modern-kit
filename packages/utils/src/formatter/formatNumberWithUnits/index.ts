import { getFormattedValueWithUnits } from './formatNumberWithUnits.utils';
import { isNumber } from '../../validator/isNumber';
import { FormatNumberWithUnitsOptions } from './formatNumberWithUnits.types';

/**
 * @description `숫자` 혹은 `숫자로 이루어진 문자열`을 주어진 `단위` 별로 포맷팅하는 함수입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 또는 숫자로 이루어진 문자열
 * @param {FormatNumberWithUnitsOptions} options - 포맷팅 옵션
 * @param {Unit[]} [options.units=DEFAULT_UNITS] - 사용할 단위 배열(조,억,만). 직접 정의해서 사용할 수 있습니다.
 * @param {boolean} [options.commas=true] - 천 단위 구분 쉼표 사용 여부입니다.
 * @param {number} [options.floorUnit=1] - 버림 단위이며, 10의 제곱수를 단위로 사용합니다. 만약, 버림 단위보다 작은 숫자는 '0'으로 반환합니다.
 * @param {boolean} [options.space=true] - 단위 사이 공백 추가 여부입니다.
 * @param {number} [options.decimal=0] - 소수점 자리수입니다. 버림 단위가 1보다 클 경우 소수점 자리수를 적용하지 않습니다.
 * @returns {string} 포맷팅된 문자열
 * @throws 입력값이 올바른 형식이 아니거나 floorUnit, decimal이 올바른 형식이 아닐 경우 에러 발생
 *
 * @example
 * // 기본 동작
 * const KRW_UNITS = [
 *   { unit: '조', value: 1_000_000_000_000 },
 *   { unit: '억', value: 100_000_000 },
 *   { unit: '만', value: 10_000 },
 * ] as const;
 *
 * formatNumberWithUnits(1234567) // "1,234,567"
 * formatNumberWithUnits(1234567, { units: KRW_UNITS }) // "123만 4,567"
 * formatNumberWithUnits('1234567', { units: KRW_UNITS }) // "123만 4,567"
 *
 * @example
 * // 단위 사이 공백 추가 (기본값: true)
 * formatNumberWithUnits(1234567, { units: KRW_UNITS, space: true }) // "123만 4,567"
 * formatNumberWithUnits(1234567, { units: KRW_UNITS, space: false }) // "123만4,567"
 *
 * @example
 * // 쉼표 사용 여부 (기본값: true)
 * formatNumberWithUnits(1234567, { units: KRW_UNITS, commas: false }) // "123만 4567"
 * formatNumberWithUnits(1234567, { units: KRW_UNITS, commas: true }) // "123만 4,567"
 *
 * @example
 * // 버림 단위 (기본값: 1)
 * formatNumberWithUnits(1234567, { units: KRW_UNITS, floorUnit: 10000 }) // "123만"
 *
 * @example
 * // 소수점 자리수 (기본값: 0)
 * formatNumberWithUnits(1234567.123, { units: KRW_UNITS, decimal: 2 }) // "123만 4,567.12"
 *
 * // floorUnit이 1보다 크면 소수점 자리수를 적용하지 않습니다.
 * formatNumberWithUnits(1234567.123, {
 *   units: KRW_UNITS,
 *   decimal: 3,
 *   floorUnit: 1000
 * }) // "123만 4,000"
 */
export function formatNumberWithUnits(
  value: number | string,
  options: FormatNumberWithUnitsOptions = {}
): string {
  const {
    units = [],
    space = true,
    commas = true,
    floorUnit = 1,
    decimal = 0,
  } = options;

  // value 값을 기준으로 내림차순 정렬
  const sortedUnits = [...units].sort((a, b) => b.value - a.value);
  const valueToUse = isNumber(value) ? value : Number(value);

  // 에러 처리
  if (isNaN(valueToUse)) {
    throw new Error('value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.');
  }

  const isValidFloorUnit =
    !Number.isInteger(floorUnit) ||
    floorUnit < 1 ||
    (floorUnit !== 1 && floorUnit % 10 !== 0);

  if (isValidFloorUnit) {
    throw new Error('floorUnit은 1을 포함한 10의 제곱수여야 합니다.');
  }

  if (!Number.isInteger(decimal) || decimal < 0) {
    throw new Error('decimal은 0 이상의 정수여야 합니다.');
  }

  return getFormattedValueWithUnits(valueToUse, {
    units: sortedUnits,
    commas,
    space,
    decimal,
    floorUnit,
  });
}
