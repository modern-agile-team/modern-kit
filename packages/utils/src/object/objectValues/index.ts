import { type ObjectKeys } from '../../object/objectKeys';

/**
 * @description `Object.values()`와 동일하게 동작하는 함수입니다.
 *
 * 이때, `symbol` 프로퍼티는 열거형이 아니기 때문에 제외됩니다.
 *
 * @template T -객체의 타입입니다.
 * @param {T} obj - 값을 추출할 대상 객체입니다.
 * @returns {T[keyof T][]} - 객체의 값을 포함하는 배열을 반환합니다.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3, [Symbol('d')]: 4 };
 * const values = objectValues(obj); // [1, 2, 3]
 * // const values: (1 | 2 | 3)[]
 */
export function objectValues<T extends Record<PropertyKey, any>>(
  obj: T
): T[ObjectKeys<T>][] {
  return Object.values(obj);
}
