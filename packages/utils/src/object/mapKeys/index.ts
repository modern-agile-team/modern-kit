/**
 * @description 주어진 객체의 각 키에 대해 제공된 변환 함수를 호출하여 새 객체를 생성하는 함수입니다.
 *
 * @template T - 원본 객체 값의 유형입니다.
 * @template U - 변환된 키의 타입입니다.
 * @param {T} object - 순회할 원본 객체입니다.
 * @param {(iterateData: { key: keyof T; value: T[keyof T]; object: T }) => U} iteratee - 객체의 각 키에 대해 호출할 변환 함수입니다.
 * @returns {Record<U, T[keyof T]>} 변환 함수의 결과를 포함하는 새 객체를 반환합니다.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * mapKeys(obj, ({ key, value }) => key + value);
 * // { a1: 1, b2: 2, c3: 3 }
 */
export function mapKeys<
  T extends Record<PropertyKey, any>,
  U extends PropertyKey
>(
  object: T,
  iteratee: (iterateData: { key: keyof T; value: T[keyof T]; object: T }) => U
): Record<U, T[keyof T]> {
  const result = {} as Record<U, T[keyof T]>;
  const keys = Object.keys(object);

  for (const key of keys) {
    const value = object[key] as T[keyof T];
    const newKey = iteratee({ key, value, object });

    result[newKey] = value;
  }

  return result;
}
