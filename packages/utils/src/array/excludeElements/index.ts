import { identity } from '../../common';

export const excludeElements = <T, U = T>(
  array: T[] | readonly T[],
  args: T[] | readonly T[],
  iteratee: (item: T) => U = identity as (item: T) => U
) => {
  const excludeSet = new Set(args.map(iteratee));

  return array.filter((element) => !excludeSet.has(iteratee(element)));
};
