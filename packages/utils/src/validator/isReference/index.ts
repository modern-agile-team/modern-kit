import { isPrimitive } from '../isPrimitive';

/**
 * @description 주어진 값이 참조 타입(Reference)인지 확인합니다.
 *
 * 이 함수는 값이 원시 타입이 아닌 경우, 즉 객체나 함수와 같은 참조 타입인지 여부를 검사합니다.
 *
 * @param {unknown} value - 참조 타입인지 확인할 값.
 * @returns {value is Record<PropertyKey, any>} - 값이 참조 타입이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * isReference({}); // true
 * isReference([]); // true
 * isReference(() => {}); // true
 *
 * @example
 * isReference(42); // false
 * isReference("hello"); // false
 */
export function isReference(value: unknown): value is Record<PropertyKey, any> {
  return !isPrimitive(value);
}
