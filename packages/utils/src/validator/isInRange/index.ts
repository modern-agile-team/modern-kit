interface IsInRangeProps {
  value: number;
  min: number;
  max: number;
  inclusiveMin?: boolean;
  inclusiveMax?: boolean;
}

/**
 * @description 주어진 value가 `min`과 `max`로 지정된 범위 내에 있는지 여부를 판단합니다.
 *
 * `inclusiveMin`/`inclusiveMax`를 통해 경계 값을 포함할지 여부를 설정할 수 있습니다. 기본적으로 최소값은 포함하며 최대값은 포함하지 않습니다.
 *
 * @param {IsInRangeProps} - isInRange 함수의 옵션 객체입니다.
 * @property {number} value - 확인할 값.
 * @property {number} min - 값이 포함되어야 하는 최소값.
 * @property {number} max - 값이 포함되어야 하는 최대값.
 * @property {boolean} inclusiveMin - `true`일 경우 최소값을 포함합니다. 기본 값은 true 입니다.
 * @property {boolean} inclusiveMax - `true`일 경우 최대값을 포함합니다. 기본 값은 false 입니다.
 * @returns {boolean} - 값이 지정된 범위 내에 있으면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @throws {Error} - `min` 또는 `max` 값이 유효하지 않거나, `min`이 `max`보다 큰 경우 오류가 발생합니다.
 *
 * @example
 * isInRange({ value: 5, min: 1, max: 10 }); // true
 * isInRange({ value: 10, min: 1, max: 10 }); // false
 *
 * @example
 * isInRange({ value: 10, min: 1, max: 10, inclusiveMax: true }); // true
 */
export function isInRange({
  value,
  min,
  max,
  inclusiveMin = true,
  inclusiveMax = false,
}: IsInRangeProps): boolean {
  if (min >= max) {
    throw new Error('최소값은 최대값보다 크거나 같은 수 없습니다.');
  }

  const isInclusiveMin = inclusiveMin ? value >= min : value > min;
  const isInclusiveMax = inclusiveMax ? value <= max : value < max;

  return isInclusiveMin && isInclusiveMax;
}
