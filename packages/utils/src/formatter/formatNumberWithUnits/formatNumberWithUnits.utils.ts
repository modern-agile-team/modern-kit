import { formatNumberWithCommas } from '../../formatter/formatNumberWithCommas';
import { FormatNumberWithUnitsOptions } from './formatNumberWithUnits.types';

/**
 * @description 쉼표 사용 여부에 따라 숫자를 포맷팅하는 함수
 *
 * @param {number} value - 포맷팅할 숫자
 * @param {boolean} commas - 쉼표 사용 여부
 * @returns {string} 포맷팅된 문자열
 */
const formatNumberWithConditionalCommas = (
  value: number | string,
  commas: boolean
): string => {
  return commas ? formatNumberWithCommas(value) : String(value);
};

/**
 * @description 주어진 단위(units)에 따라 숫자를 포맷팅하는 함수
 *
 * @param {number} value - 포맷팅할 숫자 값
 * @param {Required<FormatNumberWithUnitsOptions>} options - 포맷팅 옵션
 * @param {boolean} options.commas - 천 단위 구분 쉼표 사용 여부입니다.
 * @param {boolean} options.space - 단위 사이 공백 추가 여부입니다.
 * @param {number} options.floorUnit - 버림 단위입니다.
 * @param {number} options.decimal - 소수점 자리수입니다.
 * @returns {string} 포맷팅된 문자열
 */
export const getFormattedValueWithUnits = (
  value: number,
  options: Required<FormatNumberWithUnitsOptions>
): string => {
  const { units, commas, space, decimal, floorUnit } = options;

  const absoluteValue = Math.abs(value);
  const isNegative = value < 0;
  const hasFloorUnit = floorUnit > 1;

  let formattedResult = '';
  let remainingValue = absoluteValue;

  // value의 절대값이 floorUnit(버림 단위)보다 작으면 '0'을 반환
  if (absoluteValue < floorUnit) {
    return '0';
  }

  // floorUnit이 1보다 큰 경우, 최종 결과에서 floorUnit 미만의 값은 버림
  if (hasFloorUnit) {
    remainingValue = Math.floor(remainingValue / floorUnit) * floorUnit;
  }

  // unit 별로 나누기
  for (let i = 0; i < units.length; i++) {
    const { unit, value } = units[i];
    const quotient = Math.floor(remainingValue / value);
    const spaceToUse = space ? ' ' : '';

    if (quotient <= 0) continue;

    formattedResult += `${formatNumberWithConditionalCommas(
      quotient,
      commas
    )}${unit}${spaceToUse}`;
    remainingValue %= value;
  }

  // 남은 remainingValue가 있으면 추가
  if (remainingValue > 0) {
    // floorUnit이 주어지고, 정수가 아니라면 소수점 자리수를 적용
    const shouldApplyDecimal = !hasFloorUnit && !Number.isInteger(value);

    formattedResult += formatNumberWithConditionalCommas(
      remainingValue.toFixed(shouldApplyDecimal ? decimal : 0),
      commas
    );
  }

  // 음수일 경우 앞에 '-' 붙이며, 앞/뒤 공백 제거
  return (isNegative ? '-' : '') + formattedResult.trim();
};
