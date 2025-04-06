/**
 * @description 값과 총 값을 받아 백분율을 계산하는 함수
 *
 * @param {number} value - 값
 * @param {number} total - 총 값
 * @returns {number} 백분율
 *
 * @example
 * percentage(10, 100); // 10
 * percentage(66.666, 100); // 66.67
 *
 */
export function percentage(value: number, total: number): number {
  if (total <= 0) return 0;

  const percentage = (value / total) * 100;
  return Math.round(percentage * 100) / 100;
}
