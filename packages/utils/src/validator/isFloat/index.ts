/**
 * @description 주어진 값이 부동 소수점 수(float)인지 확인합니다.
 *
 * @param {unknown} value - 부동 소수점 수인지 확인할 값.
 * @returns {value is number} - 값이 부동 소수점 수이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * isFloat(3.14); // true
 *
 * @example
 * isFloat(42); // false
 * isFloat('3.14'); // false
 */
export function isFloat(value: unknown): value is number {
  return Number.isFinite(value) && !Number.isInteger(value);
}
