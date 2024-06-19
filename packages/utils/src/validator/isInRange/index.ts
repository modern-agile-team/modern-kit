interface IsInRangeProps {
  value: number;
  min: number;
  max: number;
  equalOptions?: {
    min?: boolean;
    max?: boolean;
  };
}

export const isInRange = ({
  value,
  min,
  max,
  equalOptions,
}: IsInRangeProps) => {
  if (min == null) throw new Error('min값은 필수입니다.');
  if (max == null) throw new Error('max값은 필수입니다.');
  if (min > max) throw new Error('min은 max보다 작아야합니다.');

  const defaultEqualOptions = {
    min: true,
    max: false,
  };

  const mergedEqualOptions = { ...defaultEqualOptions, ...equalOptions };

  const minCheck = mergedEqualOptions.min ? value >= min : value > min;
  const maxCheck = mergedEqualOptions.max ? value <= max : value < max;

  return minCheck && maxCheck;
};
