type Removable = false | 0 | '' | null | undefined;
type Retained<T> = Exclude<T, Removable>;
/**
 * @description 배열에서 falsy 값을 제거합니다.
 *
 * false, 0, '', null, undefined 값을 제거하고 새로운 배열을 반환합니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @param {readonly T[]} arr - falsy 값을 제거할 배열입니다.
 * @returns {Retained<T>[]} falsy 값이 제거된 새로운 배열을 반환합니다.
 *
 * @example
 * const arr = [0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5];
 *
 * compact(arr);
 * // [1, 2, 3, 4, 5]
 */
export function compact<T>(arr: readonly T[]): Retained<T>[] {
  const result: Retained<T>[] = [];

  for (const item of arr) {
    if (item) {
      result.push(item as Retained<T>);
    }
  }

  return result;
}
