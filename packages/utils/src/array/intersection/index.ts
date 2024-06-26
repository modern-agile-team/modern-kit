import { identity } from '../../common';

import { intersectionWithDuplicates, uniq } from '..';

export const intersection = <T, U = T>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee: (item: T) => T | U = identity,
) => {
  const intersection = intersectionWithDuplicates(
    firstArr,
    secondArr,
    iteratee,
  );

  return uniq(intersection, iteratee);
};
