export const excludeElements = <E, U extends E>(
  array: ReadonlyArray<E> | Array<E>,
  ...args: ReadonlyArray<U> | Array<U>
): Array<E> => {
  const excludeSet = new Set(args.map((arg) => JSON.stringify(arg)));

  return array.filter((element) => !excludeSet.has(JSON.stringify(element)));
};
