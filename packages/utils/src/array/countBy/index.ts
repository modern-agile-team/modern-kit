import { identity } from '../../common/identity';

/**
 * @description 배열의 각 요소가 몇 번 등장하는지 세어 객체로 반환하는 함수입니다.
 *
 * @template T - 배열의 타입
 * @param {T} arr - 배열
 * @returns {Record<T[number], number>} 배열의 각 요소의 개수를 담은 객체
 *
 * @example
 * countBy([1, 2, 3, 2, 1]);
 * // { 1: 2, 2: 2, 3: 1 }
 */
export function countBy<T extends readonly any[]>(
  arr: T
): Record<T[number], number>;

/**
 * @description 배열의 각 요소가 몇 번 등장하는지 세어 객체로 반환하는 함수입니다.
 *
 * iteratee를 전달하면 각 요소를 iteratee에 전달하여 반환된 값을 기준으로 몇 번 등장하는지 세어 객체로 반환합니다.
 *
 * @template T - 배열의 타입
 * @template K - iteratee의 반환 타입
 * @param {T} arr - 배열
 * @param {K} iteratee - 각 요소를 변환하는 함수
 * @returns {Record<K, number>} 배열의 각 요소의 개수를 담은 객체
 *
 * @example
 * countBy([1, 2, 3], (value) => value.toString());
 * // { '1': 1, '2': 1, '3': 1 }
 *
 * countBy([{ address: 'seoul' }, { address: 'incheon' }, { address: 'seoul' }], (value) => value.address);
 * // { seoul: 2, incheon: 1 }
 */
export function countBy<T extends readonly any[], K extends PropertyKey>(
  arr: T,
  iteratee: (value: T[number]) => K
): Record<K, number>;

export function countBy<T extends readonly any[], K extends PropertyKey>(
  arr: T,
  iteratee?: (value: T[number]) => K
): Record<K, number> {
  const iterateeToUse = iteratee ?? identity;
  const result = {} as Record<K, number>;

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i] as T[number];
    const key = iterateeToUse(value) as K;

    result[key] = (result[key] || 0) + 1;
  }

  return result;
}
