import { objectKeys } from '../../object/objectKeys';

/**
 * @description 주어진 객체의 각 key와 value를 주어진 iteratee 함수 결과에 따라 함께 변환하여 새로운 객체를 반환합니다.
 * iteratee 는 `[새 key, 새 value]` 튜플을 반환해야 하며, 변환된 key 가 겹치면 나중에 순회한 값으로 덮어씁니다.
 *
 * @template T - 원본 객체 값의 유형입니다.
 * @template K - 변환된 키의 타입입니다.
 * @template V - 변환된 값의 타입입니다.
 * @param {T} obj - 순회할 원본 객체입니다.
 * @param {(iterateData: { key: keyof T; value: T[keyof T]; obj: T }) => readonly [K, V]} iteratee - 각 key-value 쌍을 `[새 key, 새 value]` 로 변환하는 함수입니다.
 * @returns {Record<K, V>} 변환된 key와 value를 가진 새 객체를 반환합니다.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * mapEntries(obj, ({ key, value }) => [key.toUpperCase(), value * 10]);
 * // { A: 10, B: 20, C: 30 }
 */
export function mapEntries<
  T extends Record<PropertyKey, any>,
  K extends PropertyKey,
  V,
>(
  obj: T,
  iteratee: (iterateData: {
    key: keyof T;
    value: T[keyof T];
    obj: T;
  }) => readonly [K, V]
): Record<K, V> {
  const result = {} as Record<K, V>;
  const keys = objectKeys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];
    const [newKey, newValue] = iteratee({ key, value, obj });

    result[newKey] = newValue;
  }

  return result;
}
