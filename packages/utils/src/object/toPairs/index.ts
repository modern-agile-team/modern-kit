import type { ObjectKeys } from '../objectKeys';

type SafeKey<T extends Record<PropertyKey, any>> = `${ObjectKeys<T>}`;

const setToEntries = <V>(set: Set<V>): [V, V][] => {
  const arr = new Array(set.size);
  const values = set.values();

  for (let i = 0; i < arr.length; i++) {
    const value = values.next().value;
    arr[i] = [value, value];
  }
  return arr;
};

const mapToEntries = <K, V>(map: Map<K, V>): [K, V][] => {
  const arr = new Array(map.size);
  const keys = map.keys();
  const values = map.values();

  for (let i = 0; i < arr.length; i++) {
    arr[i] = [keys.next().value, values.next().value];
  }
  return arr;
};

/**
 * @description 주어진 값을 `[key, value]` 쌍의 배열로 변환합니다.
 *
 * Set은 entry 전환 시 값이 키와 값 양쪽에 모두 들어갑니다.
 *
 * @template {V} - Set 요소의 타입
 * @param {Set<V>} set - 변환할 Set
 * @returns {[V, V][]} `[값, 값]` 쌍의 배열을 반환합니다. (삽입 순서 유지)
 *
 * @example
 * toPairs(new Set([1, 2, 3]));
 * // [[1, 1], [2, 2], [3, 3]]  →  [number, number][]
 *
 * @example
 * toPairs(new Set([1, 2, 3] as const));
 * // [[1, 1], [2, 2], [3, 3]]  →  [1 | 2 | 3, 1 | 2 | 3][]
 */
export function toPairs<V>(set?: Set<V>): [V, V][];

/**
 * @description 주어진 값을 `[key, value]` 쌍의 배열로 변환합니다.
 *
 * @template {K} - Map 키의 타입
 * @template {V} - Map 값의 타입
 * @param {Map<K, V>} map - 변환할 Map
 * @returns {[K, V][]} `[키, 값]` 쌍의 배열을 반환합니다.
 *
 * @example
 * toPairs(new Map([['a', 1], ['b', 2]]));
 * // [['a', 1], ['b', 2]]  →  [string, number][]
 *
 * @example
 * toPairs(new Map([['a', 1], ['b', 2]] as const));
 * // [['a', 1], ['b', 2]]  →  ['a' | 'b', 1 | 2][]
 */
export function toPairs<K, V>(map?: Map<K, V>): [K, V][];

/**
 * @description 주어진 값을 `[key, value]` 쌍의 배열로 변환합니다.
 *
 * 배열의 인덱스(키)는 `Object.keys`와 동일하게 문자열로 반환됩니다.
 *
 * @template {T} - 배열 요소의 타입
 * @param {readonly T[]} array - 변환할 배열
 * @returns {[string, T][]} `[인덱스(문자열), 값]` 쌍의 배열을 반환합니다.
 *
 * @example
 * toPairs([10, 20, 30]);
 * // [['0', 10], ['1', 20], ['2', 30]]  →  [string, number][]
 *
 * @example
 * toPairs([10, 20, 30] as const);
 * // [['0', 10], ['1', 20], ['2', 30]]  →  [string, 10 | 20 | 30][]
 */
export function toPairs<T>(array?: readonly T[]): [string, T][];

/**
 * @description 주어진 값을 `[key, value]` 쌍의 배열로 변환합니다.
 *
 * `Object.keys` 기반이므로 자기 자신의 열거 가능한 프로퍼티만 포함하며,
 * symbol 키는 제외됩니다. 숫자 키도 런타임과 동일하게 문자열로 반환됩니다.
 *
 * @template {T} - 변환할 객체의 타입
 * @param {T} obj - 변환할 객체
 * @returns {[`${SafeObjectKeys<T>}`, T[SafeObjectKeys<T>]][]} `[키(문자열), 값]` 쌍의 배열을 반환합니다.
 *
 * @example
 * toPairs({ a: 1, b: 2 });
 * // [['a', 1], ['b', 2]]  →  ['a' | 'b', number][]
 *
 * @example
 * toPairs({ 0: 'x', 1: 'y' });
 * // [['0', 'x'], ['1', 'y']]  →  ['0' | '1', string][]  (키는 문자열)
 *
 * @example
 * toPairs({ a: 1, b: 2 } as const);
 * // [['a', 1], ['b', 2]]  →  ['a' | 'b', 1 | 2][]
 */
export function toPairs<T extends Record<PropertyKey, any>>(
  obj?: T
): [SafeKey<T>, T[SafeKey<T>]][];

export function toPairs<T extends Record<PropertyKey, any>>(obj?: T) {
  if (obj == null) {
    return [];
  }

  if (obj instanceof Set) {
    return setToEntries(obj);
  }

  if (obj instanceof Map) {
    return mapToEntries(obj);
  }

  return Object.entries(obj);
}
