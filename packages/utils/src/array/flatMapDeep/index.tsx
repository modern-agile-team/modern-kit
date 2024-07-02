import { ExtractNestedArrayType, NaturalNumber } from '@modern-kit/types';
import { FlatArrayWithIteratee } from './flatMapDeep.interface';
import { isArray } from '../../validator';

/**
 * @example flatMapDeep([1, 2, [3, 4, [5, 6]]])
 */
export function flatMapDeep<T>(arr: T[] | readonly T[]): FlatArray<T[], 1>[];

/**
 * @example flatMapDeep([1, 2, [3, 4, [5, 6]]], 2)
 */
export function flatMapDeep<T, D extends number>(
  arr: T[] | readonly T[],
  depth: D
): FlatArray<T[], D>[];

/**
 * @example
 * flatMapDeep([1, 2, [3, 4, [5, 6]]], 0, (item) => item * 2): FlatArray<T[], D>[]
 * flatMapDeep([1, 2, [3, 4, [5, 6]]], 1, (item) => item * 2): FlatArrayWithIteratee<T[], D, U>[]
 */
export function flatMapDeep<T, D extends number, U>(
  arr: T[] | readonly T[],
  depth: D,
  iteratee: (item: ExtractNestedArrayType<T[]>) => U
): NaturalNumber<D> extends never
  ? FlatArray<T[], D>[]
  : FlatArrayWithIteratee<T[], D, U>[];

export function flatMapDeep<T, D extends number, U>(
  arr: T[] | readonly T[],
  depth = 1 as D,
  iteratee?: (item: ExtractNestedArrayType<T[]>) => U
) {
  const shouldUseFlat = !arr.length || depth < 1 || !iteratee;

  if (shouldUseFlat) {
    return arr.flat(depth);
  }

  const recursiveFlatten = (
    arr: T[] | readonly T[],
    currentDepth: number
  ): any[] => {
    if (currentDepth > depth) return [arr];

    return arr.flatMap((item) => {
      if (isArray(item)) {
        return recursiveFlatten(item, currentDepth + 1);
      }
      return iteratee(item as ExtractNestedArrayType<T[]>);
    });
  };

  return recursiveFlatten(arr, 0) as FlatArrayWithIteratee<T[], D, U>[];
}
