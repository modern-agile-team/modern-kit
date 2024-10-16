import { cloneDeep } from '../../common';

/**
 * @description 주어진 객체에서 지정된 키들만을 선택하여 새로운 객체를 반환하는 함수입니다.
 *
 * @template T - 원본 객체의 타입.
 * @template K - 선택할 키들의 타입, T의 키 중 일부.
 *
 * @param {T} obj - 선택할 키들을 가진 원본 객체.
 * @param {K[] | readonly K[]} keys - 선택할 키들의 배열.
 * @returns {Pick<T, K>} - 지정된 키들만 포함된 새로운 객체.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = pick(obj, ['a', 'c']);
 * // { a: 1, c: 3 }
 *
 * @example
 * const user = { name: 'John', age: 30, role: 'admin' };
 * const result = pick(user, ['name', 'role']);
 * // { name: 'John', role: 'admin' }
 */
export function pick<T extends Record<PropertyKey, any>, K extends keyof T>(
  obj: T,
  keys: K[] | readonly K[]
): Pick<T, K> {
  const result = {} as T;
  const copiedObj = cloneDeep(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    result[key] = copiedObj[key];
  }

  return result;
}
