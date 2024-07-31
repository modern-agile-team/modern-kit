export function intersectionWithDuplicates<T, U>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee?: (item: T) => U
) {
  const secondArrToSet = new Set<T | U>(
    iteratee ? secondArr.map(iteratee) : secondArr
  );

  const filterFn = iteratee
    ? (element: T) => secondArrToSet.has(iteratee(element))
    : (element: T) => secondArrToSet.has(element);

  return firstArr.filter(filterFn);
}
