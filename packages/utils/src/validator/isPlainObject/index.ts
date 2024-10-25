import { isReference } from '../isReference';

/**
 * @description 주어진 값이 순수 객체(Plain Object)인지 확인합니다.
 *
 * @param {unknown} value - 순수 객체인지 확인할 값.
 * @returns {value is Record<PropertyKey, any>} - 값이 순수 객체이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * isPlainObject({}); // true
 * isPlainObject(new Object()); // true
 *
 * @example
 * isPlainObject([]); // false
 * isPlainObject(() => {}); // false
 * isPlainObject(null); // false
 */
export function isPlainObject(
  value: unknown
): value is Record<PropertyKey, any> {
  return (
    isReference(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}
