/**
 * @description 주어진 값이 `boolean` 타입인지 확인합니다.
 *
 * @param {unknown} value - `boolean` 타입인지 확인할 값.
 * @returns {value is boolean} - 값이 `boolean` 타입이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * isBoolean(true); // true
 * isBoolean(1); // false
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}
