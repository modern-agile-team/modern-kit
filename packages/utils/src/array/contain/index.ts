export const contain = <T>(
  arr: T[] | ReadonlyArray<T>,
  value: unknown,
  comparator: (x: any, y: any) => boolean = Object.is
): value is T => {
  return arr.some((item) => comparator(item, value));
};
