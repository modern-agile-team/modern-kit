import { sum } from '../sum';
import { identity } from '../../common';

export function average<T extends number>(arr: T[] | readonly T[]): T;

export function average<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): number;

export function average<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number = identity as (item: T) => number
) {
  if (arr.length <= 0) {
    return 0;
  }

  return sum(arr, iteratee) / arr.length;
}
