import { isNil } from '../../validator';

interface IsInRangeProps {
  value: number;
  min: number;
  max: number;
  equalOptions?: {
    min?: boolean;
    max?: boolean;
  };
}

/**
 * @description 값이 지정된 범위 내에 있는지 확인합니다.
 *
 * 이 함수는 주어진 값이 `min`과 `max`로 지정된 범위 내에 있는지 여부를 판단합니다.
 * `min`과 `max`가 유효한 값이어야 하며, `min`이 `max`보다 클 수 없습니다.
 * `equalOptions`를 통해 경계 값을 포함할지 여부를 설정할 수 있습니다.
 *
 * @param {{
 *   value: number;
 *   min: number;
 *   max: number;
 *   equalOptions?: {
 *     min?: boolean;
 *     max?: boolean;
 *   };
 * }}
 * - `value`: 확인할 값.
 * - `min`: 값이 포함되어야 하는 최소값.
 * - `max`:  값이 포함되어야 하는 최대값.
 * - `equalOptions.min`: `true`일 경우 최소값을 포함합니다.
 * - `equalOptions.max`: `true`일 경우 최대값을 포함합니다.
 * @returns {boolean} - 값이 지정된 범위 내에 있으면 `true`, 그렇지 않으면 `false`를 반환합니다.
 *
 * @throws {Error} - `min` 또는 `max` 값이 유효하지 않거나, `min`이 `max`보다 큰 경우 오류가 발생합니다.
 *
 * @example
 * isInRange({ value: 5, min: 1, max: 10 }); // true
 * isInRange({ value: 10, min: 1, max: 10 }); // false
 */
export function isInRange({
  value,
  min,
  max,
  equalOptions = {},
}: IsInRangeProps): boolean {
  if (isNil(min) || isNil(max)) {
    throw new Error('min and max values are invalid.');
  }

  if (min > max) {
    throw new Error('min value cannot be greater than the max value.');
  }

  const { min: minEqual = true, max: maxEqual = false } = equalOptions;

  const isWithinMin = minEqual ? value >= min : value > min;
  const isWithinMax = maxEqual ? value <= max : value < max;

  return isWithinMin && isWithinMax;
}
