import { objectKeys } from '../../object/objectKeys';

/**
 * @description 주어진 객체의 각 key를 주어진 iteratee 함수 결과에 따라 변환하여 새로운 객체를 반환합니다.
 *
 * @template T - 원본 객체 값의 유형입니다.
 * @template K - 변환된 키의 타입입니다.
 * @param {T} obj - 키를 변환할 원래 객체입니다.
 * @param {(iterateData: { key: keyof T; value: T[keyof T]; obj: T }) => K} iteratee - 각 키를 변환하기 위한 함수입니다.
 * @returns {Record<U, T[keyof T]>} 변환된 key와 원래 value을 가진 새 객체를 반환합니다.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 *
 * mapKeys(obj, ({ key, value }) => key + value);
 * // { a1: 1, b2: 2, c3: 3 }
 */
export function mapKeys<
  T extends Record<PropertyKey, any>,
  K extends PropertyKey
>(
  obj: T,
  iteratee: (iterateData: { key: keyof T; value: T[keyof T]; obj: T }) => K
): Record<K, T[keyof T]> {
  const result = {} as Record<K, T[keyof T]>;
  const keys = objectKeys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];
    const newKey = iteratee({ key, value, obj });

    result[newKey] = value;
  }

  return result;
}
