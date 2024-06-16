import { ArrayWithReadonly } from '@modern-kit/types';
import { uniq } from '../uniq';

export const union = <T, U = T>(
  arr1: ArrayWithReadonly<T>,
  arr2: ArrayWithReadonly<T>,
  iteratee?: (item: T) => U
) => {
  return uniq(arr1.concat(arr2), iteratee);
};
