/**
 * @description 주어진 인수가 숫자인지 확인합니다. 숫자 타입이 맞다면 인자의 타입은 숫자로 타입을 좁혀줍니다.
 *
 * @param {unknown} value - 확인할 값.
 * @returns {value is T} - 인수가 함수이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const maybeNumber: unknown = 1;
 * if (isNumber(maybeNumber)) {
 *   maybeNumber; // maybeNumber 이제 숫자 타입으로 안전하게 사용될 수 있습니다.
 * }
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
