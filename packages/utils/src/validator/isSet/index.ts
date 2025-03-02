/**
 * @description 주어진 값이 `Set` 타입인지 확인합니다.
 *
 * 타입 체크 및 변수의 타입을 `Set<T>`로 좁히는 데 유용합니다.
 *
 * @param {unknown} value - 확인할 값입니다.
 * @returns {value is Set<T>} 값이 `Set` 객체일 경우 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const set = new Set([1, 2, 3]);
 * isSet(set); // true
 *
 * const notSet = [1, 2, 3];
 * isSet(notSet); // false
 */
export function isSet<T>(value: unknown): value is Set<T> {
  return value instanceof Set;
}
