/**
 * @description 주어진 인수가 함수인지 확인합니다. 함수 타입이 맞다면 인자의 타입은 함수로 타입을 좁혀줍니다.
 *
 * @template T - 임의의 인수와 반환 타입을 가지는 함수 시그니처를 확장하는 제네릭 타입.
 *
 * @param {unknown} value - 확인할 값.
 * @returns {value is T} - 인수가 함수이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const maybeFunction: unknown = () => {};
 * if (isFunction(maybeFunction)) {
 *   maybeFunction();
 *   // maybeFunction은 이제 함수 타입으로 안전하게 사용될 수 있습니다.
 * }
 */
export function isFunction<T extends (...args: any[]) => any>(
  arg: unknown
): arg is T {
  return typeof arg === 'function';
}
