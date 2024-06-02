import { NaturalNumber } from '@modern-kit/types';

export const chunk = <T, U extends number>(
  array: T[],
  size: NaturalNumber<U>
): T[][] => {
  const isExceptionCase =
    array.length < 1 || !Number.isInteger(size) || size < 1;

  if (isExceptionCase) {
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
