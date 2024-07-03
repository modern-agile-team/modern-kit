import { ExtractNestedArrayType } from '@modern-kit/types';
import { isArray } from '../../validator';

/**
 * @example flatMapDeep([1, 2, [3, 4, [5, 6]]])
 */
export function flatMapDeep<T>(
  arr: T[] | readonly T[]
): ExtractNestedArrayType<T[]>[];

/**
 * @example flatMapDeep([1, 2, [3, 4, [5, 6]]], (item) => ({ id: item }))
 */
export function flatMapDeep<T, U>(
  arr: T[] | readonly T[],
  iteratee: (item: ExtractNestedArrayType<T[]>) => U
): U[];

export function flatMapDeep<T, U>(
  arr: T[] | readonly T[],
  iteratee?: (item: ExtractNestedArrayType<T[]>) => U
) {
  if (!iteratee) {
    return arr.flat(Infinity);
  }

  const recursiveFlatten = (arr: T[] | readonly T[]): U[] => {
    return arr.flatMap((item) => {
      if (isArray(item)) {
        return recursiveFlatten(item);
      }
      return iteratee(item as ExtractNestedArrayType<T[]>);
    });
  };

  return recursiveFlatten(arr);
}
