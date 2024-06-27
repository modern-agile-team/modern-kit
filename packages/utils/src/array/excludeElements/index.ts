import { identity } from '../../common';

export const excludeElements = <T, U = T>(
  array: T[] | readonly T[],
  excludeArray: T[] | readonly T[],
  iteratee: (item: T) => U = identity as (item: T) => U
) => {
  const excludeSet = new Set(excludeArray.map(iteratee));

  return array.filter((element) => !excludeSet.has(iteratee(element)));
};
