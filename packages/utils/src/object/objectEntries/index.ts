import { type ObjectKeys } from '../objectKeys';

/**
 * @description `Object.entries()`와 동일하게 동작하지만 `key` 타입을 지켜주는 함수입니다.
 *
 * 이때, `symbol` 프로퍼티는 열거형이 아니기 때문에 제외됩니다.
 *
 * @template T - 객체의 타입입니다.
 * @param {T} obj - 엔트리를 가져 올 대상 객체입니다.
 * @returns {[ObjectKeys<T>, T[ObjectKeys<T>]][]} - 키-값 쌍의 배열입니다.
 *
 * @example
 * const obj = { a: 1, b: 'hello', [Symbol('c')]: 3 };
 * const entries = objectEntries(obj); // [['a', 1], ['b', 'hello']]
 * // const entries: [('a' | 'b'), 1 | 'hello'][]
 */
export function objectEntries<T extends Record<PropertyKey, any>>(
  obj: T
): [ObjectKeys<T>, T[ObjectKeys<T>]][] {
  return Object.entries(obj) as [ObjectKeys<T>, T[ObjectKeys<T>]][];
}
