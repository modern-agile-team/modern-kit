import { formatNumberWithCommas } from '../formatNumberWithCommas';

interface Unit {
  unit: string;
  value: number;
}

type FloorUnit =
  | 1
  | 10
  | 100
  | 1000
  | 10000
  | 100000
  | 1000000
  | 10000000
  | 100000000;

export interface FormatNumberByUnitsOption {
  units?: Unit[];
  withCommas?: boolean;
  floorUnit?: FloorUnit;
  insertSpace?: boolean;
}

const getNumberWithConditionalCommas = (value: number, withCommas: boolean) => {
  return withCommas ? formatNumberWithCommas(value) : String(value);
};

export function formatNumberByUnits(
  value: number,
  options: FormatNumberByUnitsOption = {}
) {
  const {
    units = [],
    insertSpace = false,
    withCommas = false,
    floorUnit = 1,
  } = options;

  if (value < floorUnit) {
    return String(0);
  }

  if (units.length === 0) {
    return getNumberWithConditionalCommas(value, withCommas);
  }

  const sortedUnits = [...units].sort((a, b) => b.value - a.value);
  let result = '';
  let remainder = Math.floor(value / floorUnit) * floorUnit;

  sortedUnits.forEach(({ unit, value: unitValue }) => {
    const quotient = Math.floor(remainder / unitValue);

    if (quotient > 0) {
      result += `${getNumberWithConditionalCommas(
        quotient,
        withCommas
      )}${unit}`;

      if (insertSpace) result += ' ';
      remainder %= unitValue;
    }
  });

  if (remainder > 0) {
    result += `${getNumberWithConditionalCommas(remainder, withCommas)}`;
  }

  return result.trim();
}
