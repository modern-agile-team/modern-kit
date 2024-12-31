export type Primitive =
  | string
  | number
  | boolean
  | symbol
  | bigint
  | null
  | undefined;

/**
 * @description 주어진 값이 원시 타입(Primitive)인지 확인합니다.
 *
 * 이 함수는 값이 원시 타입인지 여부를 검사합니다. 원시 타입은 `string`, `number`, `boolean`, `symbol`, `bigint`, `undefined`, `null`을 포함합니다.
 *
 * @param {unknown} value - 원시 타입인지 확인할 값.
 * @returns {value is Primitive} - 값이 원시 타입이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * isPrimitive(42); // true
 * isPrimitive("hello"); // true
 * isPrimitive(null); // true
 *
 * @example
 * isPrimitive({}); // false
 * isPrimitive([]); // false
 */
export function isPrimitive(value: unknown): value is Primitive {
  return Object(value) !== value;
}
