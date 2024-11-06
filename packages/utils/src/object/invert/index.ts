import { objectKeys } from '../../object/objectKeys';

/**
 * @description 주어진 객체의 각 키와 값을 반전하여 새로운 객체를 생성합니다.
 *
 * 기본적으로 객체의 키와 값을 반전하지만, `iteratee` 함수를 제공하면 각 값에 대해 변형된 키를 생성하여 반전할 수 있습니다.
 *
 * @template K - 원래 객체의 키 타입입니다.
 * @template V - 원래 객체의 값 타입입니다.
 * @template TK - iteratee를 통해 변형된 키의 타입입니다.
 * @param {Record<K, V>} obj - 키와 값을 반전할 객체입니다.
 * @param {(iterateData?: { value: V; key: K; obj: Record<K, V> }) => TK} iteratee - 값을 변형하여 반전할 키를 생성하는 함수입니다.
 * @returns {Record<TK, K>} 키와 값이 반전된 새로운 객체를 반환합니다.
 *
 * @example
 * const original = { a: "1", b: "2", c: "3" };
 * const inverted = invert(original);
 *
 * inverted; // { 1: "a", 2: "b", 3: "c" }
 *
 * @example
 * const original = { a: "1", b: "2", c: "3" };
 * const customInverted = invert(original, ({ value }) => `key-${value}`);
 *
 * customInverted; // { "key-1": "a", "key-2": "b", "key-3": "c" }
 */
export function invert<K extends PropertyKey, V extends PropertyKey>(
  obj: Record<K, V>
): Record<V, K>;

export function invert<K extends PropertyKey, V, TK extends PropertyKey>(
  obj: Record<K, V>,
  iteratee: (iterateData: { value: V; key: K; obj: Record<K, V> }) => TK
): Record<TK, K>;

export function invert<
  K extends PropertyKey,
  V extends PropertyKey,
  TK extends PropertyKey
>(
  obj: Record<K, V>,
  iteratee?: (iterateData: { value: V; key: K; obj: Record<K, V> }) => TK
): Record<V | TK, K> {
  const result = {} as Record<V | TK, K>;
  const keys = objectKeys(obj);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const value = obj[key];

    const transformedKey = iteratee ? iteratee({ value, key, obj }) : value;

    result[transformedKey] = key;
  }

  return result;
}
