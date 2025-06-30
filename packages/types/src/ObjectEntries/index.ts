import { ObjectKeys } from '../ObjectKeys';

/**
 * @description Object.entries 함수의 반환 타입을 명확하게 정의하기 위해 사용 할 수 있습니다.
 *
 * symbol 타입의 키는 제외됩니다.
 *
 * @template T - 타입을 추출할 객체 타입
 * @returns 객체의 키와 값을 튜플로 추출한 타입을 반환합니다
 *
 * @example
 * type MyObject = { a: string, b: number };
 * type MyEntries = ObjectEntries<MyObject> // ['a' | 'b', string | number][]
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 } as const;
 * const entries = Object.entries(obj) as ObjectEntries<typeof obj>;
 * // ["a" | "b" | "c", 1 | 2 | 3][]
 */
export type ObjectEntries<T extends Record<PropertyKey, any>> = [
  ObjectKeys<T>,
  T[ObjectKeys<T>]
][];
