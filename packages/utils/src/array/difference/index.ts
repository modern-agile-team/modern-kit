export const difference = <T, U = T>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee?: (item: T) => U
) => {
  const result = [];
  const secondSet = new Set<T | U>(
    iteratee ? secondArr.map(iteratee) : secondArr
  );

  for (const item of firstArr) {
    const mappedItem = iteratee ? iteratee(item) : item;

    if (!secondSet.has(mappedItem)) {
      result.push(item);
    }
  }

  return result;
};
