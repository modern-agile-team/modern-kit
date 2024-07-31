export function contains<T>(
  arr: T[] | readonly T[],
  value: unknown,
  comparator: (x: any, y: any) => boolean = Object.is
): value is T {
  return arr.some((item) => comparator(item, value));
}
