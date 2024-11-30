import { isNil } from '../../validator';

/**
 * @description `주어진 값`을 `최댓값으로 제한`합니다.
 *
 * @param {number} value - 제한할 숫자
 * @param {number} max - 최대 범위
 * @returns {number} 지정된 범위 내로 제한된 숫자
 *
 * @example
 * clamp(3, 5); // 3
 * clamp(10, 6); // 6
 */
export function clamp(value: number, max: number): number;

/**
 * @description `주어진 값`을 `최솟값과 최댓값 사이로 제한`합니다.
 *
 * @param {number} value - 제한할 숫자
 * @param {number} min - 최소 범위
 * @param {number} max - 최대 범위
 * @returns {number} 지정된 범위 내로 제한된 숫자
 *
 * @example
 * clamp(7, 0, 10); // 7
 * clamp(10, 0, 5); // 5
 * clamp(-5, 0, 10); // 0
 */
export function clamp(value: number, min: number, max: number): number;

/**
 * @description `주어진 값`을 `최솟값과 최댓값 사이로 제한`합니다.
 *
 * 최댓값이 제공되지 않은 경우, 입력값과 최솟값 중 작은 값을 반환합니다.
 *
 * @param {number} value - 제한할 숫자
 * @param {number} min - 최소 범위 (max가 제공되지 않은 경우 최대 범위)
 * @param {number} [max] - 최대 범위 (생략 가능)
 * @returns {number} 지정된 범위 내로 제한된 숫자
 *
 * @example
 * clamp(7, 0, 10); // 7
 * clamp(10, 0, 5); // 5
 * clamp(-5, 0, 10); // 0
 */
export function clamp(value: number, min: number, max?: number): number {
  if (isNil(max)) {
    return Math.min(value, min);
  }

  return Math.min(Math.max(value, min), max);
}
