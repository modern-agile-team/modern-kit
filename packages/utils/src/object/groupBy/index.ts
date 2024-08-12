/**
 * @description
 * 배열의 요소들을 제공된 콜백 함수 `callbackFn`에 따라 그룹화하여, 각 키에 해당하는 항목들의 배열을 포함하는 객체를 반환합니다.
 *
 * @template T - 배열 항목의 타입을 나타냅니다.
 * @template K - 그룹화 키의 타입을 나타냅니다. `PropertyKey`로 제한되어 있어, 문자열, 숫자, 심볼 등 가능한 모든 키 타입을 사용할 수 있습니다.
 * @param {T[] | readonly T[]} items - 그룹화를 진행할 항목들의 배열입니다.
 * @param {(item: T) => K} callbackFn - 각 항목에 대해 그룹화 키를 반환하는 함수입니다.
 * @returns {Record<K, T[]>} - 각 키가 콜백 함수 `callbackFn`의 결과이고, 값이 해당 키에 속하는 항목들의 배열인 객체를 반환합니다.
 *
 * @example
 * const array = [
 *   { category: 'fruit', name: 'apple' },
 *   { category: 'fruit', name: 'banana' },
 *   { category: 'vegetable', name: 'carrot' },
 *   { category: 'fruit', name: 'pear' },
 *   { category: 'vegetable', name: 'broccoli' },
 * ];
 *
 * const group = groupBy(array, (item) => item.category);
 * // {
 * //  fruit: [
 * //    { category: 'fruit', name: 'apple' },
 * //    { category: 'fruit', name: 'banana' },
 * //    { category: 'fruit', name: 'pear' },
 * //  ],
 * //  vegetable: [
 * //    { category: 'vegetable', name: 'carrot' },
 * //    { category: 'vegetable', name: 'broccoli' },
 * //  ],
 * // }
 */

export function groupBy<T, K extends PropertyKey>(
  items: T[] | readonly T[],
  callbackFn: (item: T) => K
): Record<K, T[]> {
  const group = {} as Record<K, T[]>;

  for (const item of items) {
    const key = callbackFn(item);

    if (!(key in group)) {
      group[key] = [];
    }

    group[key].push(item);
  }

  return group;
}
