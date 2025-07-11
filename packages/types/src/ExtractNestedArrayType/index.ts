/**
 * @description 중첩된 배열 타입을 재귀적으로 풀어내어 가장 내부의 요소 타입을 추출하는 유틸리티 타입
 *
 * @template T - 중첩된 배열 타입을 추출할 타입
 *
 * @example
 * type Example = ExtractNestedArrayType<(number | (number | number[])[])[]>
 * // number
 */
export type ExtractNestedArrayType<T> = T extends readonly (infer U)[]
  ? ExtractNestedArrayType<U>
  : T;
