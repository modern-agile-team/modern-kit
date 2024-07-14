/**
 * @description 주어진 값이 `undefined` 또는 `null`아닌지 확인합니다.
 *
 * @template T - 확인할 값의 타입
 * @param {T | undefined | null} value - 확인할 값
 * @returns {value is undefined | null} - 값이 `undefined` 또는 `null`이면 `false`, 그렇지 않으면 `true`를 반환합니다.
 *
 * @example
 * const result = isNotNil(null);
 * // false
 *
 * const result = isNotNil(undefined);
 * // false
 *
 * const result = isNotNil(5);
 * // true
 */
export const isNotNil = <T>(value: T | undefined | null): value is T => {
  return value != null;
};
