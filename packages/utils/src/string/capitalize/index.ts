/**
 * @description 문자열의 첫 글자를 대문자로 변환하는 함수입니다.
 *
 * @template T - 변환할 문자열의 타입
 * @param {T} str - 변환할 문자열
 * @returns {Capitalize<T>} 첫 글자가 대문자로 변환된 문자열
 *
 * @example
 * capitalize('hello'); // 결과: 'Hello'
 */
export function capitalize<T extends string>(str: T): Capitalize<T> {
  return `${str[0]?.toUpperCase() ?? ''}${str.slice(1)}` as Capitalize<T>;
}
