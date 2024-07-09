export const flatten = <T, D extends number = 1>(
  arr: T[] | readonly T[],
  depth = 1 as D
) => {
  const result: FlatArray<T[], D>[] = [];
  const flooredDepth = Math.floor(depth);

  const recursive = (arr: readonly T[], currentDepth: number) => {
    for (const item of arr) {
      if (Array.isArray(item) && currentDepth < flooredDepth) {
        recursive(item, currentDepth + 1);
      } else {
        result.push(item as FlatArray<T[], D>);
      }
    }
  };

  recursive(arr, 0);
  return result;
};
