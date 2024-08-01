import { hasProperty } from '../../validator';

/**
 * @description 주어진 객체의 각 키에 대해 제공된 변환 함수를 호출하여 새 객체를 생성하는 함수입니다.
 *
 * @template T - 원본 객체 값의 유형입니다.
 * @param {T} object - 순회할 원본 객체입니다.
 * @param {(iterateData: { key: keyof T; value: T[keyof T]; object: T }) => string} iteratee - 객체의 각 키에 대해 호출할 변환 함수입니다.
 * @returns {Record<string, T[keyof T]>} 변환 함수의 결과를 포함하는 새 객체를 반환합니다.
 */
export function mapKeys<T extends Record<PropertyKey, any>>(
  object: T,
  iteratee: (iterateData: {
    key: keyof T;
    value: T[keyof T];
    object: T;
  }) => string
): Record<string, T[keyof T]> {
  const result = {} as Record<string, T[keyof T]>;

  for (const key in object) {
    if (hasProperty(object, key)) {
      const newKey = iteratee({ key, value: object[key], object });
      result[newKey] = object[key];
    }
  }

  return result;
}
