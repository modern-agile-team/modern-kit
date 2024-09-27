/**
 * @description 주어진 배열에 특정 값이 포함되어 있는지 확인하는 함수입니다.
 * 기본적으로 `Object.is`를 사용하여 비교를 수행하며, 사용자 정의 비교 함수(comparator)를 사용할 수 있습니다.
 *
 * @template T - 배열의 요소 타입입니다.
 * @param {T[] | readonly T[]} arr - 검색할 배열입니다. 변경 불가능한 읽기 전용 배열도 허용됩니다.
 * @param {U} value - 배열에서 찾고자 하는 값입니다.
 * @param {(x: T, y: U) => boolean} [comparator=Object.is] - 배열의 요소와 찾고자 하는 값을 비교할 때 사용할 사용자 정의 비교 함수입니다. 기본값은 `Object.is`입니다.
 * @returns {value is U} 주어진 값이 배열에 포함되어 있으면 `true`를, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * // 기본 비교 함수 사용 (Object.is)
 * const numbers = [1, 2, 3];
 *
 * contains(numbers, 2); // true
 * contains(numbers, 4); // false
 *
 * @example
 * // 사용자 정의 비교 함수 사용
 * const objects = [{ id: 1 }, { id: 2 }];
 * const comparator = (a: { id: number }, b: { id: number }) => a.id === b.id;
 *
 * contains(objects, { id: 2 }, (a, b) => a.id === b.id); // true
 * contains(objects, { id: 3 }, (a, b) => a.id === b.id); // false
 */
export function contains<T>(
  arr: T[] | readonly T[],
  value: unknown,
  comparator: (x: any, y: any) => boolean = Object.is
): value is T {
  return arr.some((item) => comparator(item, value));
}
