import { NaturalNumber } from '@modern-kit/types';

export const chunk = <T, U extends number>(
  array: T[],
  size: NaturalNumber<U>
): T[][] => {
  return array.reduce((result, _, index) => {
    if (index % size === 0) {
      return [...result, array.slice(index, index + size)];
    }
    return result;
  }, [] as T[][]);
};
