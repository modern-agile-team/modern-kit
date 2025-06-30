/**
 * @description 최소 1개 이상의 요소를 보장하는 즉, 빈 배열이 아닌 배열을 나타내는 타입입니다.
 *
 * @template T - 배열의 요소 타입
 *
 * @example
 * const valid: NonEmptyArray<number> = [1, 2, 3];
 *
 * @example
 * const invalid: NonEmptyArray<number> = []; // Error
 */
export type NonEmptyArray<T> = [T, ...T[]];
