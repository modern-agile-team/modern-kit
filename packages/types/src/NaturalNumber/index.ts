/**
 * @description 자연수를 나타내는 타입입니다. (0보다 큰 양의 정수)
 *
 * @template T - 숫자 타입 매개변수
 *
 * @example
 * type ValidNaturalNumber1 = NaturalNumber<1>; // 1
 * type ValidNaturalNumber2 = NaturalNumber<10>; // 10
 *
 * @example
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
