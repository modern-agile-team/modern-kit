/**
 * @description 주어진 타입과 해당 타입의 Promise 타입을 모두 허용하는 타입입니다.
 *
 * @template T - 변환할 타입
 * @example
 * type Result = Promiseable<string>; // string | Promise<string>
 */
export type Promiseable<T> = T | Promise<T>;
