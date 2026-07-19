/**
 * @description `[key, value]` 쌍의 entry를 객체로 변환합니다.
 *
 * @template T - `[key, value]` 쌍의 배열 타입
 * @param {T} pairs - 객체로 변환할 `[키, 값]` 쌍의 배열
 * @returns {Record<T[number][0], T[number][1]>} 각 쌍을 프로퍼티로 갖는 객체를 반환합니다.
 *
 * @example
 * fromPairs([['a', 1], ['b', 2]]);
 * // { a: 1, b: 2 }  →  Record<string, number>
 *
 * @example
 * // as const로 전달하면 리터럴 키/값으로 추론됩니다.
 * fromPairs([['a', 1], ['b', 2]] as const);
 * // { a: 1, b: 2 }  →  Record<'a' | 'b', 1 | 2>
 */
export function fromPairs<T extends [PropertyKey, any][]>(
  pairs: T
): Record<T[number][0], T[number][1]> {
  const obj = {} as Record<T[number][0], T[number][1]>;

  for (let i = 0; i < pairs.length; i++) {
    const [key, value] = pairs[i];
    obj[key as keyof typeof obj] = value;
  }

  return obj;
}
