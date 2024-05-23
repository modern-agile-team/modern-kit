export const countOccurrencesInArray = <T extends readonly any[]>(
  arr: T
): Record<Exclude<T[number], object>, number> => {
  return arr.reduce((acc, cur) => {
    if (typeof cur === 'object' && cur != null) {
      return acc;
    }

    acc[cur] = (acc[cur] || 0) + 1;

    return acc;
  }, {});
};
