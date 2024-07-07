export const excludeElements = <T, U>(
  array: T[] | readonly T[],
  excludeArray: T[] | readonly T[],
  iteratee?: (item: T) => U
) => {
  const exclusionSet = new Set<U | T>(
    iteratee ? excludeArray.map(iteratee) : excludeArray
  );

  const filterFn = iteratee
    ? (element: T) => !exclusionSet.has(iteratee(element))
    : (element: T) => !exclusionSet.has(element);

  return array.filter(filterFn);
};
