/**
 * @description Object.keys 함수의 반환 타입을 명확하게 정의하기 위해 사용 할 수 있습니다. `symbol` 타입의 키는 제외됩니다.
 *
 * @template T - 타입을 추출할 객체 타입
 *
 * @example
 * type MyObject = { a: string, b: number };
 * type MyKeys = SafeObjectKeys<MyObject> // 'a' | 'b'
 *
 * @example
 * const obj = { a: 1, b: 2, c: 3 } as const;
 * const keys = Object.keys(obj) as ObjectKeys<typeof obj>[]; // ('a' | 'b' | 'c')[]
 */
export type ObjectKeys<T extends Record<PropertyKey, any>> = Exclude<
  keyof T,
  symbol
>;
