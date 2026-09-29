/**
 * @description 배열의 각 요소에 `iteratee` 함수를 적용했을 때 최대값을 가지는 요소를 찾습니다.
 *
 * @template T - 배열 요소의 타입.
 * @param {readonly [T, ...T[]]} items - 검색할 비어 있지 않은 배열입니다.
 * @param {(element: T, index: number, array: T[] | readonly T[]) => number} iteratee - 각 요소에서 숫자 값을 선택하는 함수입니다.
 * @returns `iteratee` 함수에 의해 결정된 최대값을 가지는 요소를 반환합니다.
 *
 * @example
 * maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 반환값: { a: 3 }
 * maxBy([] as { a: number }[], x => x.a); // 반환값: undefined
 * maxBy([3, NaN, 1], x => x); // 반환값: NaN (built-in Math.max와 동일)
 * maxBy(
 *   [
 *     { name: 'john', age: 30 },
 *     { name: 'jane', age: 28 },
 *     { name: 'joe', age: 26 },
 *   ],
 *   x => x.age
 * ); // 반환값: { name: 'john', age: 30 }
 */
export function maxBy<T>(
  items: readonly [T, ...T[]],
  iteratee: (element: T, index: number, array: T[] | readonly T[]) => number
): T;
/**
 * @description 배열의 각 요소에 `iteratee` 함수를 적용했을 때 최대값을 가지는 요소를 찾습니다.
 *
 * @template T - 배열 요소의 타입.
 * @param {T[] | readonly T[]} items - 검색할 배열입니다.
 * @param {(element: T, index: number, array: T[] | readonly T[]) => number} iteratee - 각 요소에서 숫자 값을 선택하는 함수입니다.
 * @returns `iteratee` 함수에 의해 결정된 최대값을 가지는 요소를 반환하며, 배열이 비어있다면 `undefined`를 반환합니다.
 *
 * @example
 * maxBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 반환값: { a: 3 }
 * maxBy([] as { a: number }[], x => x.a); // 반환값: undefined
 * maxBy([3, NaN, 1], x => x); // 반환값: NaN (built-in Math.max와 동일)
 * maxBy(
 *   [
 *     { name: 'john', age: 30 },
 *     { name: 'jane', age: 28 },
 *     { name: 'joe', age: 26 },
 *   ],
 *   x => x.age
 * ); // 반환값: { name: 'john', age: 30 }
 */
export function maxBy<T>(
  items: readonly T[],
  iteratee: (element: T, index: number, array: T[] | readonly T[]) => number
): T | undefined;

export function maxBy<T>(
  items: T[] | readonly T[],
  iteratee: (element: T, index: number, array: T[] | readonly T[]) => number
): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  let maxElement = items[0];
  let max = -Infinity;

  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    const value = iteratee(element, i, items);

    if (Number.isNaN(value)) {
      return element;
    }

    if (value > max) {
      max = value;
      maxElement = element;
    }
  }

  return maxElement;
}
