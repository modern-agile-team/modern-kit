/**
 * @description 제네릭 타입으로 넣어준 타입과 더불어 null을 허용합니다.
 *
 * @template T - 타입을 추출할 타입
 * @returns 제네릭 타입으로 넣어준 타입과 더불어 null을 허용합니다.
 *
 * @example
 * type Test = Nullable<string>; // string | null
 *
 * @example
 * const test: Nullable<string> = 'test';
 * const test2: Nullable<string> = null;
 */
export type Nullable<T> = T | null;
