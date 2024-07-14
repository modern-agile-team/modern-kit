import { isArray, isPlainObject, isString } from '../../validator';

/**
 * @description 주어진 값의 크기를 반환합니다. 크기는 값의 유형에 따라 결정됩니다:
 * - 문자열의 경우, 문자 수를 반환합니다.
 * - 배열, NodeList 및 HTMLCollection의 경우, 요소의 수를 반환합니다.
 * - Set 및 Map의 경우, 항목 수를 반환합니다.
 * - 일반 객체의 경우, 자체 열거 가능한 속성의 수를 반환합니다.
 * - 그 외 숫자, WeakMap, WeakSet 등의 타입은 허용하지 않습니다.
 *
 * @param {string | Record<PropertyKey, any>} value - 크기를 결정할 값입니다. 문자열, 배열, NodeList, HTMLCollection, Set, Map 또는 일반 객체일 수 있습니다.
 * @returns {number} 주어진 값의 크기입니다.
 * @throws {Error} 값의 유형이 유효하지 않은 경우 오류를 발생시킵니다.
 *
 * @example
 * size('12345');
 * // 5
 *
 * size([1, 2, 3, 4, 5]);
 * // 5
 *
 * size({ a: 1, b: 2, c: 3, d: 4, e: 5 });
 * // 5
 */
export function size(value: string | Record<PropertyKey, any>): number {
  if (isString(value)) {
    return value.length;
  }

  if (
    isArray(value) ||
    value instanceof NodeList ||
    value instanceof HTMLCollection
  ) {
    return value.length;
  }

  if (value instanceof Set || value instanceof Map) {
    return value.size;
  }

  if (isPlainObject(value)) {
    return Object.keys(value).length;
  }

  throw new Error('Invalid value');
}
