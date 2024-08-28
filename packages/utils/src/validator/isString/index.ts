/**
 * @description 주어진 인수가 문자열인지 확인합니다. 숫자 타입이 맞다면 인자의 타입은 숫자로 타입을 좁혀줍니다.
 *
 * @param {unknown} value - 확인할 값.
 * @returns {value is string} - 값이 문자열이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const maybeString: unknown = 1;
 * if (isString(maybeString)) {
 *   maybeString; // maybeString 이제 문자열 타입으로 안전하게 사용될 수 있습니다.
 * }
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}
