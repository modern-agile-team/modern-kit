/**
 * @description 배열에서 중복된 요소를 제거하여 고유한 요소로 이루어진 새 배열을 반환합니다.
 *
 * 기본적으로 `원시 값`에 대해서만 중복 요소를 판단합니다.
 *
 * 2번째 인자인 `iteratee` 함수를 제공하면, 각 요소를 iteratee 반환값에 따라 중복 여부를 판단할 수 있습니다.
 *
 * @template T - 배열 요소의 타입
 * @template U - `iteratee` 함수가 반환하는 값의 타입으로, 중복 판단에 사용됩니다.
 *
 * @param {T[] | readonly T[]} arr - 중복을 제거하고자 하는 배열입니다.
 * @param {(item: T) => U} iteratee - 각 요소를 특정 값으로 변환하여 중복 여부를 판단하는 함수입니다.
 *
 * @returns {T[]} 고유한 요소만 포함하는 새 배열을 반환합니다. `iteratee`가 제공되면, 변환된 값 기준으로 중복이 제거된 배열이 반환됩니다.
 *
 * @example
 * uniq([1, 2, 2, 3, 4]); // [1, 2, 3, 4]
 *
 * @example
 * uniq([{ id: 1 }, { id: 2 }, { id: 1 }], item => item.id); // [{ id: 1 }, { id: 2 }]
 */
export function uniq<T>(arr: T[] | readonly T[]): T[];

export function uniq<T, U = T>(
  arr: T[] | readonly T[],
  iteratee?: (item: T) => U
): T[];

export function uniq<T, U = T>(
  arr: T[] | readonly T[],
  iteratee?: (item: T) => U
): T[] {
  if (!iteratee) {
    return Array.from(new Set(arr));
  }

  const map = new Map<U, T>();

  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    const key = iteratee(item);

    if (!map.has(key)) {
      map.set(key, item);
    }
  }

  return Array.from(map.values());
}
