/**
 * @description 배열의 각 요소에 `iteratee` 함수를 적용했을 때 최소 값을 가지는 요소를 찾습니다.
 *
 * @template T - 배열 내 요소의 타입입니다.
 * @param {readonly [T, ...T[]]} items 검색할 비어 있지 않은 요소의 배열입니다.
 * @param {(element: T, index: number, array: T[] | readonly T[]) => number} iteratee 각 요소에서 숫자 값을 선택하는 함수입니다.
 * @returns {T} `iteratee` 함수로 판단된 최소 값을 가지는 요소입니다.
 * @example
 * minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 반환값: { a: 1 }
 * minBy([] as { a: number }[], x => x.a); // 반환값: undefined
 * minBy([3, NaN, 1], x => x); // 반환값: NaN (built-in Math.min와 동일)
 * minBy(
 *   [
 *     { name: 'john', age: 30 },
 *     { name: 'jane', age: 28 },
 *     { name: 'joe', age: 26 },
 *   ],
 *   x => x.age
 * ); // 반환값: { name: 'joe', age: 26 }
 */
export function minBy<T>(
  items: readonly [T, ...T[]],
  iteratee: (element: T, index: number, array: T[] | readonly T[]) => number
): T;

/**
 * @description 배열의 각 요소에 `iteratee` 함수를 적용했을 때 최소 값을 가지는 요소를 찾습니다.
 *
 * @template T - 배열 내 요소의 타입입니다.
 * @param {T[] | readonly T[]} items 검색할 요소의 배열입니다.
 * @param {(element: T, index: number, array: T[] | readonly T[]) => number} iteratee 각 요소에서 숫자 값을 선택하는 함수입니다.
 * @returns {T | undefined} `iteratee` 함수로 판단된 최소 값을 가지는 요소, 또는 배열이 비어 있으면 `undefined`를 반환합니다.
 * @example
 * minBy([{ a: 1 }, { a: 2 }, { a: 3 }], x => x.a); // 반환값: { a: 1 }
 * minBy([] as { a: number }[], x => x.a); // 반환값: undefined
 * minBy([3, NaN, 1], x => x); // 반환값: NaN (built-in Math.min와 동일)
 * minBy(
 *   [
 *     { name: 'john', age: 30 },
 *     { name: 'jane', age: 28 },
 *     { name: 'joe', age: 26 },
 *   ],
 *   x => x.age
 * ); // 반환값: { name: 'joe', age: 26 }
 */
export function minBy<T>(
  items: T[] | readonly T[],
  iteratee: (element: T, index: number, array: T[] | readonly T[]) => number
): T | undefined;

export function minBy<T>(
  items: T[] | readonly T[],
  iteratee: (element: T, index: number, array: T[] | readonly T[]) => number
): T | undefined {
  if (items.length === 0) {
    return undefined;
  }

  let minElement = items[0];
  let min = Infinity;

  for (let i = 0; i < items.length; i++) {
    const element = items[i];
    const value = iteratee(element, i, items);

    if (Number.isNaN(value)) {
      return element;
    }

    if (value < min) {
      min = value;
      minElement = element;
    }
  }

  return minElement;
}
