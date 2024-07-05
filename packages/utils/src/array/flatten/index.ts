export const flatten = <T, D extends number = 1>(
  arr: T[] | readonly T[],
  depth = 1 as D
) => {
  const result = [] as FlatArray<T[], D>[];

  const recursive = (arr: readonly T[], currentDepth: number) => {
    for (const item of arr) {
      if (Array.isArray(item) && currentDepth < depth) {
        recursive(item, currentDepth + 1);
      } else {
        result.push(item as FlatArray<T[], D>);
      }
    }
  };

  recursive(arr, 0);
  return result;
};
