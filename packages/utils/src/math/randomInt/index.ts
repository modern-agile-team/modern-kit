import { isNil } from '../../validator/isNil';
import { random } from '../random';

/**
 * @description 0부터 지정된 최대값 사이의 정수를 반환합니다.
 *
 * @param {number} maximum - 정수 범위의 최대값입니다.
 * @returns {number} 0 이상 maximum 미만의 정수를 반환합니다.
 *
 * @example
 * randomInt(10); // 0 이상 10 미만의 정수를 반환
 */
export function randomInt(maximum: number): number;

/**
 * @description 지정된 범위에서 정수를 반환합니다.
 *
 * @param {number} minimum - 정수 범위의 최소값입니다.
 * @param {number} maximum - 정수 범위의 최대값입니다.
 * @returns {number} minimum 이상 maximum 미만의 정수를 반환합니다.
 *
 * @example
 * randomInt(5, 15); // 5 이상 15 미만의 정수를 반환
 */
export function randomInt(minimum: number, maximum: number): number;

/**
 * @description 지정된 범위에서 정수를 반환합니다.
 *
 * @param {number} minimum - 정수 범위의 최소값입니다.
 * @param {number} [maximum] - 정수 범위의 최대값입니다. 제공되지 않으면 `0`부터 `minimum`까지의 정수를 생성합니다.
 * @returns {number} minimum 이상 maximum 미만의 정수를 반환합니다.
 *
 * @example
 * randomInt(10); // 0 이상 10 미만의 정수를 반환
 *
 * @example
 * randomInt(5, 15); // 5 이상 15 미만의 정수를 반환
 */
export function randomInt(minimum: number, maximum?: number): number {
  if (isNil(maximum)) {
    return Math.floor(random(minimum));
  }
  return Math.floor(random(minimum, maximum));
}
