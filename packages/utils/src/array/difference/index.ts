import { identity } from '../../common';

export const difference = <T, U = T>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee: (item: T) => T | U = identity,
) => {
  const secondArrSetAppliedIteratee = new Set(secondArr.map(iteratee));

  return firstArr.filter((firstArrItem) => {
    const firstArrItemAppliedIteratee = iteratee(firstArrItem);

    return !secondArrSetAppliedIteratee.has(firstArrItemAppliedIteratee);
  });
};
