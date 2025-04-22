/**
 * @description 주어진 `숫자`를 주어진 `단위`로 나누고, 그 결과를 단위와 곱한 숫자를 반환합니다.
 *
 * @param {number} value - 나눌 숫자
 * @param {number} unit - 나눌 단위
 * @returns {number} 나누고 내림한 숫자
 *
 * @example
 * formatNumberFloorUnit(1234567, 1000);
 * // 1234000
 *
 * formatNumberFloorUnit(-1234567, 1000);
 * // -1234000
 */
export function formatNumberFloorUnit(value: number, unit: number): number {
  if (value < 0) {
    return Math.ceil(value / unit) * unit;
  }
  return Math.floor(value / unit) * unit;
}
