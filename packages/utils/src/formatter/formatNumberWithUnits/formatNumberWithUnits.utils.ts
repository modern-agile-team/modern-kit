import { formatNumberWithSeparator } from '../formatNumberWithSeparator';
import { FormatNumberWithUnitsOptions } from './formatNumberWithUnits.types';

interface FormatOptions
  extends Omit<Required<FormatNumberWithUnitsOptions>, 'units' | 'floorUnit'> {
  value: number;
  unit: string;
}

/**
 * @description 구분 기호 사용 여부에 따라 숫자를 포맷팅하는 함수
 *
 * @param {number} value - 포맷팅할 숫자
 * @param {string} separator - 구분 기호
 * @returns {string} 포맷팅된 문자열
 */
const formatNumberWithConditionalSeparator = (
  value: number | string,
  separator: string
): string => {
  return separator
    ? formatNumberWithSeparator(value, separator)
    : String(value);
};

/**
 * @description 남은 값을 포맷팅하는 내부 유틸 함수
 *
 * @param {FormatOptions} options - 포맷팅 옵션
 * @param {number} options.decimal - 소수점 자리수
 * @param {string} options.separator - 천 단위 구분 기호
 * @returns {string} 포맷팅된 문자열
 */
const formatRemainingValue = ({
  value,
  decimal,
  separator,
}: Omit<FormatOptions, 'space' | 'unit'>): string => {
  const formattedValue = Number.isInteger(value)
    ? value
    : value.toFixed(decimal);
  return formatNumberWithConditionalSeparator(formattedValue, separator);
};

/**
 * @description 숫자에 단위를 추가하고 포맷팅하는 내부 유틸 함수
 *
 * @param {FormatOptions} options - 포맷팅 옵션
 * @param {number} options.value - 포맷팅할 숫자
 * @param {string} options.unit - 단위
 * @param {string} options.separator - 천 단위 구분 기호
 * @param {boolean} options.space - 단위 사이 공백 추가 여부
 * @returns {string} 포맷팅된 문자열
 */
const formatUnitValue = ({
  value,
  unit,
  separator,
  space,
}: Omit<FormatOptions, 'decimal'>): string => {
  return `${formatNumberWithConditionalSeparator(value, separator)}${unit}${
    space ? ' ' : ''
  }`;
};

/**
 * @description 주어진 단위(units)에 따라 숫자를 포맷팅하는 함수
 *
 * @param {number} value - 포맷팅할 숫자 값
 * @param {Required<FormatNumberWithUnitsOptions>} options - 포맷팅 옵션
 * @param {string} options.separator - 천의 단위 구분 기호
 * @param {boolean} options.space - 단위 사이 공백 추가 여부입니다.
 * @param {number} options.floorUnit - 버림 단위입니다.
 * @param {number} options.decimal - 소수점 자리수입니다.
 * @returns {string} 포맷팅된 문자열
 */
export const getFormattedValueWithUnits = (
  value: number,
  options: Required<FormatNumberWithUnitsOptions>
): string => {
  const { units, separator, space, decimal, floorUnit } = options;

  const absoluteValue = Math.abs(value);
  const isNegative = value < 0;
  let formattedResult = '';
  let remainingValue = absoluteValue;

  // value가 floorUnit(버림 단위)보다 작으면 '0'을 반환
  if (absoluteValue < floorUnit) {
    return '0';
  }

  // floorUnit이 1보다 큰 경우, 최종 결과에서 floorUnit 미만의 값은 버림
  if (floorUnit > 1) {
    remainingValue = Math.floor(remainingValue / floorUnit) * floorUnit;
  }

  // unit 별로 나누기
  for (let i = 0; i < units.length; i++) {
    const { unit, value } = units[i];
    const quotient = Math.floor(remainingValue / value);

    if (quotient <= 0) continue;

    formattedResult += formatUnitValue({
      value: quotient,
      unit,
      separator,
      space,
    });
    remainingValue %= value;
  }

  // 남은 remainingValue가 있으면 추가
  if (remainingValue > 0) {
    formattedResult += formatRemainingValue({
      value: remainingValue,
      decimal,
      separator,
    });
  }

  // 음수일 경우 앞에 '-' 붙이며, 앞/뒤 공백 제거
  return (isNegative ? '-' : '') + formattedResult.trim();
};
