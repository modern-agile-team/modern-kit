import { objectKeys } from '../../object/objectKeys';

/**
 * @description 주어진 객체의 각 key-value 쌍을 순회하며 reducer 함수를 실행해 하나의 결과값으로 누적합니다.
 * Array.prototype.reduce 처럼 동작하며, 객체 자신의 열거 가능한 string key 만 순회합니다.
 *
 * @template T - 순회할 객체의 유형입니다.
 * @template A - 누적값의 유형입니다.
 * @param {T} obj - 순회할 객체입니다.
 * @param {(accumulator: A, iterateData: { key: keyof T; value: T[keyof T]; obj: T }) => A} reducer - 각 key-value 쌍에 대해 호출되어 다음 누적값을 반환하는 함수입니다.
 * @param {A} initialValue - 누적의 시작값입니다.
 * @returns {A} 모든 key-value 쌍을 순회한 뒤의 최종 누적값을 반환합니다.
 *
 * @example
 * const cart = { apple: 1000, banana: 2000, cherry: 3000 };
 *
 * reduceObject(cart, (sum, { value }) => sum + value, 0);
 * // 6000
 *
 * @example
 * const params = { page: 1, size: 20 };
 *
 * reduceObject(params, (acc, { key, value }) => [...acc, `${key}=${value}`], [] as string[]);
 * // ['page=1', 'size=20']
 */
export function reduceObject<T extends Record<PropertyKey, any>, A>(
  obj: T,
  reducer: (
    accumulator: A,
    iterateData: { key: keyof T; value: T[keyof T]; obj: T }
  ) => A,
  initialValue: A
): A {
  const keys = objectKeys(obj);
  let accumulator = initialValue;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];

    accumulator = reducer(accumulator, { key, value, obj });
  }

  return accumulator;
}
