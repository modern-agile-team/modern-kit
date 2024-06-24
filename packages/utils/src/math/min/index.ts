import { identity } from '../../common';

export function min<T extends number>(arr: T[] | readonly T[]): T;
export function min<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): T;

export function min<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number = identity as (item: T) => number
) {
  let minValue = Number.MAX_SAFE_INTEGER;
  let minItem = arr[0];

  arr.forEach((item) => {
    const value = iteratee(item);

    if (value < minValue) {
      minItem = item;
      minValue = value;
    }
  });

  return minItem;
}
