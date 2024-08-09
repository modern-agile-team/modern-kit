import { ExtractNestedArrayType } from '@modern-kit/types';
import { flatten } from '../../array/flatten';

/**
 * @description 주어진 중첩 배열의 `모든 깊이`를 `평탄화`해주는 함수입니다.
 *
 * @template T - 배열 요소의 유형입니다.
 * @param {T[] | readonly T[]} arr - 평탄화할 배열입니다.
 * @returns {ExtractNestedArrayType<T>[]} 모든 중첩된 배열이 평탄화된 새로운 배열을 반환합니다.
 *
 * @example
 * flattenDeep([1, [2, [3, [4]], 5]]);
 * // [1, 2, 3, 4, 5]
 */
export function flattenDeep<T>(arr: T[] | readonly T[]) {
  return flatten(arr, Infinity) as ExtractNestedArrayType<T>[];
}
