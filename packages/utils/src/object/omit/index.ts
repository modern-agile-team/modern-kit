/**
 * @description 주어진 객체에서 지정된 키들을 제거한 새로운 객체를 반환하는 함수입니다.
 *
 * @template T - 원본 객체의 타입.
 * @template K - 제거할 키들의 타입, T의 키 중 일부.
 *
 * @param {T} obj - 키를 제거할 원본 객체.
 * @param {K[] | readonly K[]} keys - 제거할 키들의 배열.
 * @returns {Omit<T, K>} - 지정된 키들이 제거된 새로운 객체.
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * const result = omit(obj, ['a', 'c']);
 * // { b: 2 }
 */
export function omit<T extends Record<PropertyKey, any>, K extends keyof T>(
  obj: T,
  keys: K[] | readonly K[]
): Omit<T, K> {
  const result = { ...obj };

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    delete result[key];
  }

  return result;
}
