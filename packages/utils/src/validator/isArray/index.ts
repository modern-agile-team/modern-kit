/**
 * @description 주어진 값이 배열인지 확인합니다. 배열 타입이 맞다면 인자의 타입은 배열로 타입을 좁혀줍니다.
 *
 * @template T - 배열의 요소 타입을 지정하는 제네릭 타입. 기본값은 `unknown`입니다.
 *
 * @param {unknown} value - 배열인지 확인할 값.
 * @returns {value is T[] | readonly T[]} - 값이 배열이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const maybeArray: unknown = [1, 2, 3];
 * if (isArray<number>(maybeArray)) {
 *   maybeArray; // 이제 배열로 안전하게 사용될 수 있습니다.
 * }
 */
export function isArray<T>(value: unknown): value is T[] | readonly T[] {
  return Array.isArray(value);
}
