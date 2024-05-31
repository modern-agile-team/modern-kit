import { NaturalNumber } from '@modern-kit/types';

export const chunk = <T>(array: T[], size: NaturalNumber<number>): any[][] => {
  return array.reduce((result, _, index) => {
    if (index % size === 0) {
      return [...result, array.slice(index, index + size)];
    }
    return result;
  }, [] as T[][]);
};
