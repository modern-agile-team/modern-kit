import { formatNumberWithCommas } from '../../formatter/formatNumberWithCommas';

/**
 * @description 쉼표 사용 여부에 따라 숫자를 포맷팅하는 함수
 *
 * @param {number} value - 포맷팅할 숫자
 * @param {boolean} commas - 쉼표 사용 여부
 * @returns {string} 포맷팅된 문자열
 */
export const getNumberWithConditionalCommas = (
  value: number | string,
  commas: boolean
): string => {
  return commas ? formatNumberWithCommas(value) : String(value);
};
