import { NaturalNumber } from '@modern-kit/types';

export const chunk = <T, U extends number>(
  array: T[],
  size: NaturalNumber<U>
): T[][] => {
  if (array.length === 0 || Number.isNaN(size) || size === 0) {
    return [];
  }

  if (size >= array.length) {
    return [array];
  }

  return array.reduce((result, _, index) => {
    if (index % size === 0) {
      result.push(array.slice(index, index + size));
    }
    return result;
  }, [] as T[][]);
};
