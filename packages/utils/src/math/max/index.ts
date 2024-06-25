import { identity } from '../../common';

export function max<T extends number>(arr: T[] | readonly T[]): T;
export function max<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): T;

export function max<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number = identity as (item: T) => number
) {
  let maxValue = iteratee(arr[0]);
  let maxItem = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const value = iteratee(arr[i]);

    if (value > maxValue) {
      maxItem = arr[i];
      maxValue = value;
    }
  }

  return maxItem;
}
