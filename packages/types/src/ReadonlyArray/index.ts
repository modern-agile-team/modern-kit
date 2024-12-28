/**
 * @description 읽기 전용 배열을 나타내는 타입입니다.
 * 기본 배열 타입은 더 좁은 타입의 읽기 전용 배열과 호환됩니다.
 *
 * @template T - 배열의 요소 타입
 * @returns 읽기 전용 배열 타입
 * @example
 * ```typescript
 * type MyArray = ReadonlyArray<number>;
 *
 * const myArray: MyArray = [1, 2, 3]; // 허용
 * const myArray2: MyArray = [1, 2, 3] as const; // 허용
 * ```
 */
export type ReadonlyArray<T> = readonly T[];
