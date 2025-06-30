/**
 * @description 주어진 숫자 타입이 음수인지 확인하는 타입
 *
 * @template T - 검사할 숫자 타입
 * @returns 입력된 타입 T가 음수인 경우 T를 반환하고, 그렇지 않으면 never를 반환
 *
 * @example
 * type ValidNegativeNumber1 = NegativeNumber<-1>; // -1
 * type ValidNegativeNumber2 = NegativeNumber<-10>; // -10
 *
 * @example
 * type InvalidNegativeNumber1 = NegativeNumber<1>;  // never
 * type InvalidNegativeNumber2 = NegativeNumber<0>;  // never
 * type InvalidNegativeNumber3 = NegativeNumber<1.5>;  // never
 */
export type NegativeNumber<T extends number> = `${T}` extends `-${number}`
  ? T
  : never;
