/**
 * @description 주어진 객체의 각 값에 대해 제공된 변환 함수를 호출하여 새 객체를 생성하는 함수입니다.
 *
 * @template T - 원본 객체 값의 유형입니다.
 * @template R - 반환할 새 객체 값의 유형입니다.
 * @param {T} object - 순회할 원본 객체입니다.
 * @param {(iterateData: { key: keyof T; value: T[keyof T]; object: T }) => V} iteratee - 객체의 각 값에 대해 호출할 변환 함수입니다.
 * @returns {Record<keyof T, V>} 변환 함수의 결과를 포함하는 새 객체를 반환합니다.
 *
 * @example
 * const obj = { fred: { age: 40 }, pebbles: { age: 1 } };
 * mapValues(users, ({ value }) => value.age)
 * // { fred: 40, pebbles: 1 }
 */
export function mapValues<T extends Record<PropertyKey, any>, V>(
  object: T,
  iteratee: (iterateData: { key: keyof T; value: T[keyof T]; object: T }) => V
): Record<keyof T, V> {
  const result = {} as Record<keyof T, V>;
  const keys = Object.keys(object);

  for (const key of keys) {
    const value = object[key] as T[keyof T];
    result[key as keyof T] = iteratee({ key, value, object });
  }

  return result;
}
