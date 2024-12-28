/**
 * @description 숫자 타입이 정수인지 확인하는 타입
 *
 * @template T - 검사할 숫자 타입
 * @returns 입력된 숫자가 정수이면 해당 타입을 반환하고, 소수점이 있으면 never를 반환
 *
 * @example
 * type ValidInteger = Integer<1>; // 1
 * type InvalidInteger = Integer<1.5>; // never
 */
export type Integer<T extends number> = `${T}` extends `${string}.${string}`
  ? never
  : T;
