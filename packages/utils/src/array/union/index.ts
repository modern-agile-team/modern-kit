import { uniq } from '../uniq';

export const union = <T, U = T>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[],
  iteratee?: (item: T) => U
) => {
  return uniq(arr1.concat(arr2), iteratee);
};
