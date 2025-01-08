import { formatNumberWithCommas } from '../../formatter/formatNumberWithCommas';
import { isNumber } from '../../validator/isNumber';

interface Unit {
  unit: string;
  value: number;
}

type FloorUnit =
  | 1
  | 10
  | 100
  | 1_000
  | 10_000
  | 100_000
  | 1_000_000
  | 10_000_000
  | 100_000_000
  | 1_000_000_000
  | 10_000_000_000
  | 100_000_000_000
  | 1_000_000_000_000;

export interface FormatNumberWithUnitsOptions {
  units?: Unit[];
  commas?: boolean;
  floorUnit?: FloorUnit;
  space?: boolean;
}

const ONE_TRILLION = 1_000_000_000_000;
const ONE_HUNDRED_MILLION = 100_000_000;
const TEN_THOUSAND = 10_000;

export const DEFAULT_UNITS: Unit[] = [
  { unit: '조', value: ONE_TRILLION },
  { unit: '억', value: ONE_HUNDRED_MILLION },
  { unit: '만', value: TEN_THOUSAND },
];

/**
 * @description 쉼표 사용 여부에 따라 숫자를 포맷팅하는 함수
 *
 * @param {number} value - 포맷팅할 숫자
 * @param {boolean} commas - 쉼표 사용 여부
 * @returns {string} 포맷팅된 문자열
 */
export const getNumberWithConditionalCommas = (
  value: number,
  commas: boolean
): string => {
  return commas ? formatNumberWithCommas(value) : String(value);
};

/**
 * @description `숫자` 혹은 `숫자로 이루어진 문자열`을 주어진 `단위` 별로 포맷팅하는 함수입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 또는 숫자로 이루어진 문자열
 * @param {FormatNumberWithUnitsOptions} options - 포맷팅 옵션
 * @param {Unit[]} [options.units=DEFAULT_UNITS] - 사용할 단위 배열(조,억,만). 직접 정의해서 사용할 수 있습니다.
 * @param {boolean} [options.commas=true] - 천 단위 구분 쉼표 사용 여부
 * @param {number} [options.floorUnit=1] - 버림 단위(기본값: 1). 버림 단위보다 작은 숫자는 '0'으로 반환합니다.
 * @param {boolean} [options.space=true] - 단위 사이 공백 추가 여부
 * @returns {string} 포맷팅된 문자열
 * @throws 입력값이 숫자로 변환할 수 없는 경우 에러 발생
 *
 * @example
 * // 기본 동작
 * formatNumberWithUnits(1234567) // "123만 4,567"
 *
 * @example
 * // 단위 사이 공백 추가
 * formatNumberWithUnits(1234567, { space: true }) // "123만 4,567"
 * formatNumberWithUnits(1234567, { space: false }) // "123만4,567"
 *
 * @example
 * // 쉼표 사용 여부
 * formatNumberWithUnits(1234567, { commas: false }) // "123만 4567"
 * formatNumberWithUnits(1234567, { commas: true }) // "123만 4,567"
 *
 * @example
 * // 버림 단위
 * formatNumberWithUnits(1234567, { floorUnit: 10000 }) // "123만"
 *
 * @example
 * // 사용자 정의 단위
 * const customUnits = [
 *   { unit: 'K', value: 1000 },
 *   { unit: 'M', value: 1000000 },
 * ];
 *
 * formatNumberWithUnits(1234567, {
 *   units: customUnits,
 *   floorUnit: 1000,
 * }) // "1M 234K"
 *
 * // 단위 적용 X
 * formatNumberWithUnits(1234567, {
 *   units: [],
 *   floorUnit: 1000,
 * }); // "1,234,000"
 */
export function formatNumberWithUnits(
  value: number | string,
  options: FormatNumberWithUnitsOptions = {}
): string {
  const {
    units = DEFAULT_UNITS,
    space = true,
    commas = true,
    floorUnit = 1,
  } = options;

  const valueToUse = isNumber(value) ? value : Number(value);

  if (isNaN(valueToUse)) {
    throw new Error('value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.');
  }

  // value가 floorUnit(버림 단위)보다 작으면 '0'을 반환
  if (Math.abs(valueToUse) < floorUnit) {
    return '0';
  }

  const isNegative = valueToUse < 0;
  const absoluteValue = Math.abs(valueToUse);
  const sortedUnits = [...units].sort((a, b) => b.value - a.value);

  let formattedResult = '';
  let remainingValue = Math.floor(absoluteValue / floorUnit) * floorUnit;

  // unit 별로 나누기
  for (let i = 0; i < sortedUnits.length; i++) {
    const { unit, value } = sortedUnits[i];
    const quotient = Math.floor(remainingValue / value);

    if (quotient <= 0) continue;

    formattedResult += `${getNumberWithConditionalCommas(
      quotient,
      commas
    )}${unit}${space ? ' ' : ''}`;

    remainingValue %= value;
  }

  // 남은 remainingValue가 있으면 추가
  if (remainingValue > 0) {
    formattedResult += `${getNumberWithConditionalCommas(
      remainingValue,
      commas
    )}`;
  }

  // 음수일 경우 앞에 '-' 붙이며, 앞/뒤 공백 제거
  return (isNegative ? '-' : '') + formattedResult.trim();
}
