import { objectKeys } from '../../object/objectKeys';

/**
 * @description 주어진 객체의 각 value를 주어진 iteratee 함수 결과에 따라 변환하여 새로운 객체를 반환합니다.
 *
 * @template T - 원본 객체 값의 유형입니다.
 * @template V - 반환할 새 객체 값의 유형입니다.
 * @param {T} obj - 순회할 원본 객체입니다.
 * @param {(iterateData: { key: keyof T; value: T[keyof T]; obj: T }) => V} iteratee - 객체의 각 값에 대해 호출할 변환 함수입니다.
 * @returns {Record<keyof T, V>} 변환된 value와 원래 key를 가진 새 객체를 반환합니다.
 *
 * @example
 * const obj = { fred: { age: 40 }, pebbles: { age: 1 } };
 *
 * mapValues(users, ({ value }) => value.age)
 * // { fred: 40, pebbles: 1 }
 */
export function mapValues<T extends Record<PropertyKey, any>, V>(
  obj: T,
  iteratee: (iterateData: { key: keyof T; value: T[keyof T]; obj: T }) => V
): Record<keyof T, V> {
  const result = {} as Record<keyof T, V>;
  const keys = objectKeys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];
    const newValue = iteratee({ key, value, obj });

    result[key] = newValue;
  }

  return result;
}
