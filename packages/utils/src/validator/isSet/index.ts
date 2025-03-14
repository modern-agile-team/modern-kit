/**
 * @description 주어진 인자가 `Set` 객체인지 검사하는 함수입니다.
 *
 * 타입 체크 및 인자의 타입을 `Set`으로 좁히는 데 유용합니다.
 *
 * @param {unknown} value - 확인할 값입니다.
 * @returns {value is Set<any>} 값이 `Set` 객체일 경우 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const set = new Set([1, 2, 3]);
 * isSet(set); // true
 *
 * const notSet = [1, 2, 3];
 * isSet(notSet); // false
 */
export function isSet(value: unknown): value is Set<any> {
  return value instanceof Set;
}
