/**
 * @description 주어진 객체의 각 값에 대해 제공된 변환 함수를 호출하여 새 객체를 생성하는 함수입니다.
 *
 * @template T - 원본 객체 값의 유형입니다.
 * @template R - 반환할 새 객체 값의 유형입니다.
 * @param {Record<string | number, T>} object - 순회할 원본 객체입니다.
 * @param {(iterateData: { key: string | number; value: T; object: Record<string | number, T> }) => R} iteratee - 객체의 각 값에 대해 호출할 변환 함수입니다.
 * @returns {Record<string | number, R>} 변환 함수의 결과를 포함하는 새 객체를 반환합니다.
 */
export const mapValues = <T, R>(
  object: Record<string | number, T>,
  iteratee: (iterateData: {
    key: string | number;
    value: T;
    object: Record<string | number, T>;
  }) => R
): Record<string | number, R> => {
  const result = {} as Record<string | number, R>;

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      result[key] = iteratee({ key, value: object[key], object });
    }
  }

  return result;
};
