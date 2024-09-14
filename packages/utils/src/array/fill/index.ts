/**
 *
 * @description 배열을 지정한 값으로 채웁니다.
 *
 * 시작점과 끝점에 대한 인자를 받으면 해당하는 범위의 인덱스만 지정한 값으로 변경합니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @template U - 배열 요소를 대체할 값의 유형입니다.
 * @param {T[] | readonly T[]} array - 변경할 대상 배열입니다.
 * @param {U} target - 대체할 값입니다.
 * @param {number} [start] - 대체를 시작할 인덱스입니다. 기본값은 0입니다.
 * @param {number} [end] - 대체를 종료할 인덱스입니다. 기본값은 배열의 길이입니다.
 * @returns {U[]} - 변경된 배열을 반환합니다.
 *
 * @example
 * fill([1, 2, 3], 0);
 * // [0, 0, 0]
 */

export function fill<T, U>(array: T[] | readonly T[], target: U): U[];
export function fill<T, U>(
  array: T[] | readonly T[],
  target: U,
  start: number,
): (T | U)[];
export function fill<T, U>(
  array: T[] | readonly T[],
  target: U,
  start: number,
  end: number,
): (T | U)[];
export function fill<T, U>(
  array: T[] | readonly T[],
  target: U,
  start?: number,
  end?: number,
) {
  const result = [...array] as (T | U)[];

  const startIndex = start ?? 0;
  const endIndex = end ?? array.length;

  for (let i = startIndex; i < endIndex; i++) {
    result[i] = target;
  }

  return result;
}
