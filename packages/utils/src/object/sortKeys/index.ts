/**
 * @description 주어진 객체의 key 를 정렬한 새로운 객체를 반환합니다.
 *
 * 객체 자신의 열거 가능한 string key 만 정렬 대상이며, 원본 객체를 변경하지 않습니다.
 * 최상위 key 만 정렬하며, 중첩된 객체까지 정렬하려면 `sortKeysDeep` 을 사용합니다.
 *
 * @note JS 객체는 정수 형태의 key(`'1'`, `'10'`)를 항상 오름차순으로 먼저 나열하므로,
 * `comparator` 와 상관없이 정수 key 는 문자열 key 보다 앞에 위치합니다.
 *
 * @template T - 정렬할 객체의 타입
 * @param {T} obj - key 를 정렬할 객체
 * @param {(a: string, b: string) => number} [comparator] - key 정렬에 사용할 비교 함수. 생략하면 `Array.prototype.sort` 기본 순서(UTF-16 코드 유닛)로 정렬합니다.
 * @returns {T} - key 가 정렬된 새로운 객체
 *
 * @example
 * sortKeys({ c: 3, a: 1, b: 2 });
 * // { a: 1, b: 2, c: 3 }
 *
 * @example
 * // 역순 정렬
 * sortKeys({ a: 1, b: 2 }, (a, b) => b.localeCompare(a));
 * // { b: 2, a: 1 }
 */
export function sortKeys<T extends Record<PropertyKey, any>>(
  obj: T,
  comparator?: (a: string, b: string) => number
): T {
  const result: Record<string, any> = {};
  const keys = Object.keys(obj).sort(comparator);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    result[key] = obj[key];
  }

  return result as T;
}
