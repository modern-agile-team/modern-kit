/**
 * @description 주어진 값이 `undefined` 또는 `null`인지 확인합니다.
 *
 * @template T - 확인할 값의 타입
 * @param {T | undefined | null} value - 확인할 값
 * @returns {value is undefined | null} - 값이 `undefined` 또는 `null`이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const result = isNil(null);
 * // true
 *
 * const result = isNil(undefined);
 * // true
 *
 * const result = isNil(5);
 * // false
 */
export function isNil<T>(
  value: T | undefined | null
): value is undefined | null {
  return value == null;
}
