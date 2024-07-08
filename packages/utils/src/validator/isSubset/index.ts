import { difference } from '../../array';

export const isSubset = <T, U>(
  superset: T[] | readonly T[],
  subset: readonly T[],
  iteratee?: (item: T) => U
) => {
  return difference(subset, superset, iteratee).length === 0;
};