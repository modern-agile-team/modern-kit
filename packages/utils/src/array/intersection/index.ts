import { identity } from '../../common';

export const intersection = <T, U = T>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee: (item: T) => T | U = identity,
) => {
  const secondArrSetAppliedIteratee = new Set(secondArr.map(iteratee));

  const intersection = [];
  const checkedSet = new Set();

  for (const item of firstArr) {
    const appliedIterateeItem = iteratee(item);

    if (checkedSet.has(appliedIterateeItem)) continue;

    if (secondArrSetAppliedIteratee.has(appliedIterateeItem)) {
      intersection.push(item);
      checkedSet.add(appliedIterateeItem);
    }
  }

  return intersection;
};
