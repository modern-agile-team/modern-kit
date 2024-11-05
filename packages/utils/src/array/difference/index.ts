/**
 * @description 첫 번째 배열에서 두 번째 배열에 없는 요소들을 반환하는 함수입니다.
 *
 * `iteratee` 함수를 제공하여 각 요소를 변환한 후 결과 값을 기반으로 비교할 수 있습니다.
 *
 * @template T - 첫 번째 배열의 요소 타입입니다.
 * @template U - `iteratee` 함수가 반환하는 타입으로, 기본값은 `T`와 같습니다.
 * @param {T[] | readonly T[]} firstArr - 차집합을 구할 기준이 되는 첫 번째 배열입니다.
 * @param {T[] | readonly T[]} secondArr - 첫 번째 배열에서 제거할 요소들이 포함된 두 번째 배열입니다.
 * @param {(item: T) => U} [iteratee] - 각 배열 요소를 비교하기 전에 변환하는 함수입니다. 이 함수가 제공되면, 변환된 결과를 기준으로 비교합니다.
 * @returns {T[]} 두 번째 배열에 없는 첫 번째 배열의 요소들이 담긴 배열을 반환합니다.
 *
 * @example
 * // 기본 사용 예제
 * const arr1 = [1, 2, 3, 4];
 * const arr2 = [2, 4];
 *
 * difference(arr1, arr2); // [1, 3]
 *
 * @example
 * // iteratee 함수 사용 예제
 * const users = [
 *   { id: 1, name: 'Alice' },
 *   { id: 2, name: 'Bob' },
 *   { id: 3, name: 'Charlie' }
 * ];
 * const activeUserIds = [1, 3];
 *
 * difference(users, activeUserIds, user => user.id));
 * // [{ id: 2, name: 'Bob' }]
 */
export function difference<T, U = T>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee?: (item: T) => U
): T[] {
  if (!iteratee) {
    const secondSet = new Set(secondArr);
    return firstArr.filter((item) => !secondSet.has(item));
  }

  const secondSet = new Set(secondArr.map((item) => iteratee(item)));
  return firstArr.filter((item) => !secondSet.has(iteratee(item)));
}
