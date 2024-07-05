export const excludeElements = <T, U>(
  array: T[] | readonly T[],
  excludeArray: T[] | readonly T[],
  iteratee?: (item: T) => U
) => {
  const excludeArrayToUse = iteratee
    ? excludeArray.map(iteratee)
    : excludeArray;

  const exclusionSet = new Set<T | U>(excludeArrayToUse);

  if (iteratee) {
    return array.filter((element) => !exclusionSet.has(iteratee(element)));
  }
  return array.filter((element) => !exclusionSet.has(element));
};
