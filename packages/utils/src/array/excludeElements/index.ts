export function excludeElements<T, U>(
  arr: T[] | readonly T[],
  excludeArr: T[] | readonly T[],
  iteratee?: (item: T) => U
) {
  const exclusionSet = new Set<U | T>(
    iteratee ? excludeArr.map(iteratee) : excludeArr
  );

  const filterFn = iteratee
    ? (element: T) => !exclusionSet.has(iteratee(element))
    : (element: T) => !exclusionSet.has(element);

  return arr.filter(filterFn);
}
