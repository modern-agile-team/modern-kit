import { difference } from '../../array';

export function isSubset<T, U>(
  superset: T[] | readonly T[],
  subset: T[] | readonly T[],
  iteratee?: (item: T) => U
) {
  return difference(subset, superset, iteratee).length === 0;
}
