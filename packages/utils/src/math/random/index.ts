import { isUndefined } from 'lodash-es';

/**
 * @description 지정된 범위 내에서 난수를 생성합니다.
 *
 * @param {number} minimum - 난수 범위의 최소값입니다.
 * @param {number} [maximum] - 난수 범위의 최대값입니다. 제공되지 않으면 `0`부터 `minimum`까지의 난수를 생성합니다.
 * @returns {number} 지정된 범위 내의 무작위 숫자를 반환합니다.
 *
 * @example
 * random(10); // 0 이상 10 이하의 난수를 반환
 *
 * @example
 * random(5, 15); // 5 이상 15 이하의 난수를 반환
 *
 */
export function random(minimum: number, maximum?: number): number {
  if (isUndefined(maximum)) {
    maximum = minimum;
    minimum = 0;
  }
  const rangeSize = maximum - minimum + 1;
  return Math.floor(Math.random() * rangeSize) + minimum;
}
