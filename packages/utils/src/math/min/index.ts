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
  let minValue = iteratee(arr[0]);
  let minItem = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const value = iteratee(arr[i]);

    if (value < minValue) {
      minItem = arr[i];
      minValue = value;
    }
  }

  return minItem;
}
