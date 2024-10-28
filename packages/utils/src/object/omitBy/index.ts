import { objectKeys } from '../../object/objectKeys';

/**
 * @description 주어진 객체에서 `predicate` 함수를 만족하는 프로퍼티를 제외한 새로운 객체를 반환하는 함수입니다.
 *
 * @template T - 원본 객체의 타입.
 *
 * @param {T} obj - 주어진 함수를 적용시킬 원본 객체.
 * @param {(value: T[string], key: keyof T) => boolean} predicate - 어떤 프로퍼티를 제거할 지 결정하는 함수. 프로퍼티의 값과 키를 인자로 받아 `true`를 반환하면 해당 프로퍼티를 제거합니다.
 * @returns {Partial<T>} - `predicate` 함수를 만족하지 않는 프로퍼티로 구성된 새로운 객체.
 *
 * @example
 * const obj = { a: 1, b: undefined, c: null, d: '', e: 'str' };
 * const result = omitBy(obj, (value) => !value);
 * // { a: 1, e: 'str' }
 */
export function omitBy<T extends Record<PropertyKey, any>>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result: Partial<T> = {};
  const objKeys = objectKeys(obj);

  for (let i = 0; i < objKeys.length; i++) {
    const key = objKeys[i];
    const value = obj[key];

    if (!predicate(value, key)) {
      result[key] = value;
    }
  }

  return result;
}
