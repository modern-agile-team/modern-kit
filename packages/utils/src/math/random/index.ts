import { isNil } from '../../validator/isNil';

/**
 * @description 0부터 지정된 최대값 사이의 난수를 생성합니다.
 *
 * @param {number} maximum - 난수 범위의 최대값입니다.
 * @returns {number} 0 이상 maximum 미만의 무작위 숫자를 반환합니다.
 *
 * @example
 * random(10); // 0 이상 10 미만의 난수를 반환
 */
export function random(maximum: number): number;

/**
 * @description 지정된 범위 내에서 난수를 생성합니다.
 *
 * @param {number} minimum - 난수 범위의 최소값입니다.
 * @param {number} maximum - 난수 범위의 최대값입니다.
 * @returns {number} minimum 이상 maximum 미만의 난수를 반환합니다.
 *
 * @example
 * random(10, 20); // 10 이상 20 미만의 난수를 반환
 */
export function random(minimum: number, maximum: number): number;

/**
 * @description 지정된 범위 내에서 난수를 생성합니다.
 *
 * @param {number} minimum - 난수 범위의 최소값입니다.
 * @param {number} [maximum] - 난수 범위의 최대값입니다. 제공되지 않으면 `0`부터 `minimum`까지의 난수를 생성합니다.
 * @returns {number} minimum 이상 maximum 미만의 난수를 반환합니다.
 *
 * @example
 * random(10); // 0 이상 10 미만의 난수를 반환
 *
 * @example
 * random(5, 15); // 5 이상 15 미만의 난수를 반환
 */
export function random(minimum: number, maximum?: number): number {
  if (isNil(maximum)) {
    maximum = minimum;
    minimum = 0;
  }

  if (minimum > maximum) {
    throw new Error('maximum은 minimum보다 커야 합니다.');
  }

  const rangeSize = maximum - minimum;
  return Math.random() * rangeSize + minimum;
}
