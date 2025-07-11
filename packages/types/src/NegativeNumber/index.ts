/**
 * @description 주어진 숫자 타입이 `음수`인지 확인하는 타입입니다. 음수가 아닐 경우 `never`를 반환합니다.
 *
 * @template T - 숫자 타입 매개변수
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
