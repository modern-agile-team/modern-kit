/**
 * @description 배열의 각 요소를 주어진 키 생성 함수에 따라 매핑합니다.
 *
 * 이 함수는 배열과 각 요소에서 키를 생성하는 함수를 받아,
 * 생성된 키를 객체의 키로 하고 해당 요소를 값으로 하는 객체를 반환합니다.
 * 동일한 키를 생성하는 요소가 여러 개 있을 경우, 마지막 요소가 값으로 설정됩니다.
 *
 * @template T - 배열 요소의 타입.
 * @template K - 키의 타입.
 * @param {T[] | readonly T[]} arr - 매핑할 요소들의 배열.
 * @param {(item: T, index: number, array: T[] | readonly T[]) => K} iteratee - 요소, 인덱스, 배열을 받아 키를 생성하는 함수.
 * @returns {Record<K, T>} 배열의 각 요소에 대해 키로 매핑된 객체를 반환합니다.
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' }
 * ];
 *
 * const result = keyBy(array, item => item.category);
 * // {
 * //   fruit: { category: 'fruit', name: 'banana' },
 * //   vegetable: { category: 'vegetable', name: 'carrot' }
 * // }
 *
 * @example
 * // 인덱스 파라미터 사용
 * const items = ['a', 'b', 'c'];
 * const result = keyBy(items, (item, index) => index);
 * // { 0: 'a', 1: 'b', 2: 'c' }
 */
export function keyBy<T, K extends PropertyKey>(
  arr: T[] | readonly T[],
  iteratee: (item: T, index: number, array: T[] | readonly T[]) => K
): Record<K, T> {
  const result = {} as Record<K, T>;

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = iteratee(item, i, arr);
    result[key] = item;
  }

  return result;
}
