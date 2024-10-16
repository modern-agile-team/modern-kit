/**
 * @description 주어진 배열에서 특정 요소를 제외한 배열을 반환하는 함수입니다.
 * `target` 배열에 포함된 요소들이 `arr`에서 필터링되며, 선택적으로 제공되는 `iteratee` 함수를
 * 사용하여 요소를 비교할 수 있습니다.
 *
 * @template T - 원본 배열(`arr`) 및 제외 대상 배열(`target`)의 요소 타입.
 * @template U - 선택적으로 제공되는 `iteratee` 함수의 반환 타입.
 *
 * @param {T[] | readonly T[]} arr - 제외할 요소들을 포함한 원본 배열.
 * @param {T[] | readonly T[]} target - 제외할 요소들을 포함한 배열.
 * @param {(item: T) => U} [iteratee] - 요소를 비교할 때 사용하는 선택적 함수.
 * 이 함수가 제공되면, 각 요소에 대해 함수의 반환값이 비교에 사용됩니다.
 *
 * @returns {T[]} - `target` 배열에 포함된 요소들이 제외된 원본 배열의 사본.
 *
 * @example
 * const arr = [1, 2, 3, 4];
 * const target = [2, 4];
 * const result = excludeElements(arr, target);
 * // 결과: [1, 3]
 *
 * @example
 * const arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
 * const target = [{ id: 2 }];
 * const result = excludeElements(arr, target, item => item.id);
 * // 결과: [{ id: 1 }, { id: 3 }]
 */
export function excludeElements<T, U>(
  arr: T[] | readonly T[],
  target: T[] | readonly T[],
  iteratee?: (item: T) => U
): T[] {
  const exclusionSet = new Set<U | T>(iteratee ? target.map(iteratee) : target);

  const filterFn = iteratee
    ? (element: T) => !exclusionSet.has(iteratee(element))
    : (element: T) => !exclusionSet.has(element);

  return arr.filter(filterFn);
}
