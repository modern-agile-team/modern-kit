/**
 * @description 배열을 주어진 기준에 따라 그룹화합니다.
 *
 * `iteratee` 함수를 전달하여 반환된 키를 기준으로 항목들을 그룹화합니다. 각 키는 그룹화된 항목 배열을 포함하는 객체의 속성으로 할당됩니다.
 *
 * 24년 3월 js 신규 스펙으로 groupBy가 제공되지만 버전 호환성을 위해 해당 함수가 사용 될 수 있습니다.
 * @see https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy
 *
 * @template T - 배열 항목의 타입을 나타냅니다.
 * @template K - 그룹화 기준으로 사용할 키의 타입입니다.
 * @param {T[] | readonly T[]} arr - 그룹화를 진행할 항목들의 배열입니다.
 * @param {(item: T) => K} iteratee - 각 항목에 대해 그룹화 키를 반환하는 함수입니다.
 * @returns {Record<K, T[]>} - 각 키가 그룹화된 항목 배열을 가지는 객체를 반환합니다.
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
 * //   fruit: [
 * //     { category: 'fruit', name: 'apple' },
 * //     { category: 'fruit', name: 'banana' },
 * //     { category: 'fruit', name: 'pear' },
 * //   ],
 * //   vegetable: [
 * //     { category: 'vegetable', name: 'carrot' },
 * //     { category: 'vegetable', name: 'broccoli' },
 * //   ],
 * // }
 */
export function groupBy<T, K extends PropertyKey>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => K
): Record<K, T[]> {
  const group = {} as Record<K, T[]>;

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = iteratee(item);

    if (group[key] == null) {
      group[key] = [];
    }

    group[key].push(item);
  }

  return group;
}
