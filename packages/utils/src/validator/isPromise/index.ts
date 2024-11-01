/**
 * @description 주어진 값이 `Promise` 객체인지 확인합니다.
 *
 * @template T - `Promise`가 해결할 때 반환할 값의 타입.
 *
 * @param {unknown} value - `Promise` 객체인지 확인할 값.
 * @returns {value is Promise<T>} - 값이 `Promise` 객체이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const promise = new Promise((resolve) => resolve(42));
 * isPromise(promise); // true
 * isPromise(42); // false
 */
export function isPromise<T = any>(value: unknown): value is Promise<T> {
  return value instanceof Promise;
}
