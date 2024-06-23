import { identity } from '../../common';

export const difference = <T, U = T>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee: (item: T) => T | U = identity,
) => {
  const appliedIterateeSecondSet = new Set(secondArr.map(iteratee));

  return firstArr.filter((firstArrItem) => {
    const appliedIterateeFirstArrItem = iteratee(firstArrItem);

    return !appliedIterateeSecondSet.has(appliedIterateeFirstArrItem);
  });
};
