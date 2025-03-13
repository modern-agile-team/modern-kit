/**
 * @description 주어진 값이 `Map` 타입인지 확인합니다. `Map` 타입이 맞다면 인자의 타입은 `Map`으로 타입을 좁혀줍니다.
 *
 * @template K - `Map` 요소 `key값`의 타입을 지정하는 제네릭 타입. 기본값은 `unknown`입니다.
 * @template V - `Map` 요소 `value값`의 타입을 지정하는 제네릭 타입. 기본값은 `unknown`입니다.
 *
 * @param {unknown} value - `Map`인지 확인할 값.
 * @returns {value is Map<K, V>} - 값이 `Map`이면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @example
 * const maybeMap = new Map([['hello', 5], ['world', 5]]);
 * if (isMap<string, number>(maybeMap)) {
 *   maybeMap; // 이제 Map으로 안전하게 사용될 수 있습니다.
 * }
 *
 * const notMap = { hello: 5, world: 5 };
 * isMap(notMap); // false
 */
export function isMap<K, V>(value: unknown): value is Map<K, V> {
  return value instanceof Map;
}
