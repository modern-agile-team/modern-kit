export const isSubset = <T, U>(
  parentArray: T[] | readonly T[],
  childArray: T[] | readonly T[],
  iteratee?: (item: T) => U
) => {
  const baseArray = iteratee ? parentArray.map(iteratee) : parentArray;

  const baseSet = new Set<T | U>(baseArray);

  for (const el of childArray) {
    if (!baseSet.has(iteratee ? iteratee(el) : el)) {
      return false;
    }
  }
  return true;
};
