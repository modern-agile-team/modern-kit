export const partition = <T>(
  arr: T[] | ReadonlyArray<T>,
  predicate: (item: T) => boolean
): [truthyArray: T[], falsyArray: T[]] => {
  const truthyArray: T[] = [];
  const falsyArray: T[] = [];

  arr.forEach((item) => {
    if (predicate(item)) {
      truthyArray.push(item);
    } else {
      falsyArray.push(item);
    }
  });

  return [truthyArray, falsyArray];
};
