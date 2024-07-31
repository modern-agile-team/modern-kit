interface IsInRangeProps {
  value: number;
  min: number;
  max: number;
  equalOptions?: {
    min?: boolean;
    max?: boolean;
  };
}

export function isInRange({
  value,
  min,
  max,
  equalOptions = {},
}: IsInRangeProps) {
  if (min == null || max == null) {
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
