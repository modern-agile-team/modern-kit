/**
 * @description 배열 요소 타입을 추출하는 유틸리티 타입입니다.
 * 중첩 배열의 경우 재귀적으로 풀어내어 가장 내부의 요소 타입을 추출합니다.
 *
 * @template T - 배열의 요소 타입을 추출할 타입
 *
 * @example
 * type ExtractedType = ExtractArrayElement<number[]>
 * // number
 *
 * @example
 * type ExtractedType = ExtractArrayElement<(number | (string | boolean[])[])[]>
 * // number | string | boolean
 */
export type ExtractArrayElement<T> = T extends readonly (infer U)[]
  ? ExtractArrayElement<U>
  : T;
