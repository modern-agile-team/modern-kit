import { objectKeys, type ObjectKeys } from '../../object/objectKeys';

type SafeKey<T extends Record<PropertyKey, any>> = `${ObjectKeys<T>}`;

/**
 * @description 주어진 객체의 각 key-value 쌍에 대해 제공된 `콜백 함수`를 호출합니다.
 * Array.prototype.forEach 처럼 반환값 없이 단순 순회하며, 객체 자신의 열거 가능한 string key 만 순회합니다.
 *
 * @template T - 순회할 객체의 유형입니다.
 * @param {T} obj - 순회할 객체입니다.
 * @param {(value: T[keyof T], key: SafeKey<T>, obj: T) => void} callback - 객체의 각 key-value 쌍에 대해 호출할 함수입니다.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * forEachObject(obj, (value, key, object) => {
 *   console.log(value, key, object);
 *   // 1 'a' { a: 1, b: 2, c: 3 }
 *   // 2 'b' { a: 1, b: 2, c: 3 }
 *   // 3 'c' { a: 1, b: 2, c: 3 }
 * });
 */
export function forEachObject<T extends Record<PropertyKey, any>>(
  obj: T,
  callback: (value: T[keyof T], key: SafeKey<T>, obj: T) => void
) {
  const keys = objectKeys(obj) as SafeKey<T>[];

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    callback(obj[key], key, obj);
  }
}
