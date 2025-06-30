import { NaturalNumber } from '../NaturalNumber';

/**
 * @description 양의 정수에 0을 포함한 숫자를 나타내는 타입입니다. (음이 아닌 정수)
 *
 * @template T - 숫자 타입 매개변수
 * @returns {T} 입력된 숫자가 자연수(0 포함)인 경우 해당 타입을 반환하고, 그렇지 않으면 `never`를 반환합니다.
 *
 * @example
 * type ValidWholeNumber1 = WholeNumber<1>;    // 1
 * type ValidWholeNumber2 = WholeNumber<0>;    // 0
 *
 * @example
 * type InvalidWholeNumber1 = WholeNumber<-1>;   // never (음수이므로)
 * type InvalidWholeNumber2 = WholeNumber<1.5>;  // never (소수이므로)
 */
export type WholeNumber<T extends number> = T extends 0 ? 0 : NaturalNumber<T>;
