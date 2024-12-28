/**
 * @description 자연수를 나타내는 타입입니다 (0보다 큰 양의 정수).
 *
 * @template T - 검사할 숫자 타입
 * @returns 입력된 숫자 T가 자연수인 경우 해당 타입을 반환하고,유효하지 않은 자연수인 경우 never를 반환합니다.
 * @example
 * type ValidNaturalNumber = NaturalNumber<1>; // 1
 * type InvalidNaturalNumber1 = NaturalNumber<0>; // never
 * type InvalidNaturalNumber2 = NaturalNumber<-1>; // never
 * type InvalidNaturalNumber3 = NaturalNumber<1.5>; // never
 */
export type NaturalNumber<T extends number> = `${T}` extends
  | `${number}.${number}`
  | `-${string}`
  | '0'
  ? never
  : T;
