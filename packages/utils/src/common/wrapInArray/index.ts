import { isArray } from '../../validator/isArray';

/**
 * @description 주어진 값을 배열로 감싸는 함수입니다. 만약 값이 이미 배열이면 그대로 반환하고,
 * 배열이 아닌 값이면 해당 값을 새로운 배열로 감싸서 반환합니다.
 *
 * @template T 입력 값의 타입
 * @param {T | T[]} value 배열로 감쌀 값 또는 이미 배열인 값
 * @returns {T[]} 배열로 감싸진 값 또는 그대로 배열
 *
 * @example
 * wrapInArray(1); // [1]
 * wrapInArray([1, 2, 3]); // [1, 2, 3]
 */
export function wrapInArray<T>(value: T | T[]): T[] {
  return isArray(value) ? value : [value];
}
