import { identity } from '../../common';

export const intersection = <T, U = T>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee: (item: T) => T | U = identity,
) => {
  const appliedIterateeSecondSet = new Set(secondArr.map(iteratee));

  const intersection = [];
  const checkedSet = new Set();

  for (const item of firstArr) {
    const appliedIterateeFirstArrItem = iteratee(item);

    if (checkedSet.has(appliedIterateeFirstArrItem)) continue;

    if (appliedIterateeSecondSet.has(appliedIterateeFirstArrItem)) {
      intersection.push(item);
      checkedSet.add(appliedIterateeFirstArrItem);
    }
  }

  return intersection;
};
