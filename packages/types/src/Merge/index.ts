/**
 * @description 두 객체 타입을 병합하는 타입입니다. 이때, 겹치는 프로퍼티는 두 번째 타입의 타입으로 대체됩니다.
 *
 * @template A - 첫 번째 타입
 * @template B - 두 번째 타입
 *
 * @example
 * type A = { a: string, b: number }
 * type B = { b: string, c: boolean }
 * type Result = Merge<A, B>
 *
 * // 동작 원리와 순서
 * // 1. Result = Merge<A, B>
 * // 2. Result = Omit<A, 'b' | 'c'> & B
 * // 3. Result = { a: string } & B
 * // 4. Result = { a: string, b: string, c: boolean }
 */
export type Merge<
  A extends Record<PropertyKey, any>,
  B extends Record<PropertyKey, any>
> = Omit<A, keyof B> & B;
