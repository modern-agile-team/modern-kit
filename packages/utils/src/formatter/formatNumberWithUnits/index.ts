import { formatNumberWithCommas } from '../formatNumberWithCommas';
import { isNumber } from '../../validator/isNumber';

interface Unit {
  unit: string;
  value: number;
}

interface FormatNumberWithUnitsOptions {
  units: Unit[] | readonly Unit[];
  commas?: boolean;
}

/**
 * @description 쉼표 사용 여부에 따라 숫자를 포맷팅하는 함수
 */
const formatNumberWithConditionalCommas = (value: number, commas: boolean) => {
  return commas ? formatNumberWithCommas(value) : value;
};

/**
 * @description 주어진 단위 배열에 따라 숫자를 포맷팅하는 함수
 */
const getFormattedNumberWithUnits = (
  value: number,
  options: FormatNumberWithUnitsOptions
) => {
  const { units, commas = true } = options;
  const sortedUnits = [...units].sort((a, b) => b.value - a.value);

  let formattedResult = '';
  let remainingValue = value;

  // unit 별로 나누기
  for (let i = 0; i < sortedUnits.length; i++) {
    const { unit, value } = units[i];
    const quotient = Math.floor(remainingValue / value);
    const space = ' ';

    if (quotient <= 0) continue;

    formattedResult += `${formatNumberWithConditionalCommas(
      quotient,
      commas
    )}${unit}${space}`;
    remainingValue %= value;
  }

  // 남은 값이 있으면 추가
  if (remainingValue > 0) {
    formattedResult += `${formatNumberWithConditionalCommas(
      remainingValue,
      commas
    )}`;
  }

  return formattedResult.trim();
};

/**
 * @description `숫자` 혹은 `숫자로 이루어진 문자열`을 주어진 `단위` 별로 포맷팅하는 함수입니다.
 *
 * @param {number | string} value - 포맷팅할 숫자 또는 숫자로 이루어진 문자열
 * @param {FormatNumberWithUnitsOptions} options - 포맷팅 옵션
 * @param {Unit[]} options.units - 사용할 단위 배열
 * @param {boolean} [options.commas=true] - 쉼표 사용 여부
 * @returns {string} 포맷팅된 문자열
 * @throws 주어진 숫자가 숫자 혹은 숫자로 이뤄진 문자열이 아닐 경우 에러 발생
 *
 * @example
 * const KRW_UNITS = [
 *   { unit: '억', value: 100_000_000 },
 *   { unit: '만', value: 10_000 },
 * ] as const;
 *
 * formatNumberWithUnits(123456789, {
 *   units: KRW_UNITS,
 * }) // "1억 2,345만 6,789"
 *
 * @example
 * formatNumberWithUnits(123456789, {
 *   units: KRW_UNITS,
 *   commas: false,
 * }) // "1억 2345만 6789"
 */
export function formatNumberWithUnits(
  value: number | string,
  options: FormatNumberWithUnitsOptions
): string {
  const valueToUse = isNumber(value) ? value : Number(value);

  if (isNaN(valueToUse)) {
    throw new Error('value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.');
  }

  return getFormattedNumberWithUnits(valueToUse, options);
}
