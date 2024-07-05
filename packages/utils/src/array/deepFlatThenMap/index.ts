import { ExtractNestedArrayType } from '@modern-kit/types';
import { flatten } from '../../array';

/**
 * @example deepFlatThenMap([1, 2, [3, 4, [5, 6]]])
 */
export function deepFlatThenMap<T>(
  arr: T[] | readonly T[]
): ExtractNestedArrayType<T>[];

/**
 * @example deepFlatThenMap([1, 2, [3, 4, [5, 6]]], (item) => ({ id: item }))
 */
export function deepFlatThenMap<T, U>(
  arr: T[] | readonly T[],
  iteratee: (item: ExtractNestedArrayType<T>) => U
): U[];

export function deepFlatThenMap<T, U>(
  arr: T[] | readonly T[],
  iteratee?: (item: ExtractNestedArrayType<T>) => U
) {
  const flattenList = flatten(arr, Infinity) as ExtractNestedArrayType<T>[];

  if (!iteratee) {
    return flattenList;
  }

  return flattenList.map(iteratee);
}
