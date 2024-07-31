export function partition<T>(
  arr: T[] | readonly T[],
  predicate: (item: T) => boolean
): [truthyArray: T[], falsyArray: T[]] {
  const truthyArray: T[] = [];
  const falsyArray: T[] = [];

  for (const item of arr) {
    if (predicate(item)) {
      truthyArray.push(item);
    } else {
      falsyArray.push(item);
    }
  }

  return [truthyArray, falsyArray];
}
