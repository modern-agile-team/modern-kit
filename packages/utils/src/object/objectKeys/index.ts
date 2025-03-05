export type ObjectKeys<T extends Record<PropertyKey, any>> = Exclude<
  keyof T,
  symbol
>;

/**
 * @description `Object.keys()`와 동일하게 동작하지만 `key` 타입을 지켜주는 함수입니다.
 *
 * 이때, `symbol` 프로퍼티는 열거형이 아니기 때문에 제외됩니다.
 *
 * @template T -객체의 타입입니다.
 * @param {T} obj - 키를 추출할 대상 객체입니다.
 * @returns {(keyof T)[]} - 객체의 키를 포함하는 배열을 반환합니다.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3, [Symbol('d')]: 4 };
 * const keys = objectKeys(obj); // ['a', 'b', 'c']
 * // const keys: ('a' | 'b' | 'c')[]
 */
export function objectKeys<T extends Record<PropertyKey, any>>(
  obj: T
): ObjectKeys<T>[] {
  return Object.keys(obj) as ObjectKeys<T>[];
}
