export const excludeElements = <T, U extends T>(
  array: T[] | readonly T[],
  ...args: T[] | readonly U[]
) => {
  const excludeSet = new Set(args.map((arg) => JSON.stringify(arg)));

  return array.filter((element) => !excludeSet.has(JSON.stringify(element)));
};
