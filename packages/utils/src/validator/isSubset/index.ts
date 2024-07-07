export const isSubset = <T, U>(
  parentArray: readonly T[],
  childArray: readonly T[],
  iteratee?: (item: T) => U
) => {
  const baseArray = iteratee ? parentArray.map(iteratee) : parentArray;
  const cmpArray = iteratee ? childArray.map(iteratee) : childArray;

  const baseSet = new Set<T | U>(baseArray);

  return (cmpArray as any).every((el: T | U) => baseSet.has(el));
};
