import { identity } from '../../common';

export function sum<T extends number>(arr: T[] | readonly T[]): T;

export function sum<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number
): number;

export function sum<T>(
  arr: T[] | readonly T[],
  iteratee: (item: T) => number = identity as (item: T) => number
) {
  let acc = 0;

  for (const item of arr) {
    acc += iteratee(item);
  }

  return acc;
}
