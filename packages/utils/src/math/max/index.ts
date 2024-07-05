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
  let maxValue = Number.MIN_SAFE_INTEGER;
  let maxItem = arr[0];

  for (const item of arr) {
    const value = iteratee(item);

    if (value > maxValue) {
      maxItem = item;
      maxValue = value;
    }
  }

  return maxItem;
}
