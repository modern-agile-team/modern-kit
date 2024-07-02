import { ExtractNestedArrayType } from '@modern-kit/types';
import { FlatArrayWithIteratee } from './deepFlatMap.interface';

// 함수 오버로딩
// 1. depth 존재하지 않을 때
export function deepFlatMap<T>(arr: T[] | readonly T[]): FlatArray<T[], 1>[];

// 2. depth 존재 할 때
export function deepFlatMap<T, D extends number>(
  arr: T[] | readonly T[],
  depth: D
): FlatArray<T[], D>[];

// 3. iteratee가 존재할 때
export function deepFlatMap<T, D extends number, U>(
  arr: T[] | readonly T[],
  depth: D,
  iteratee: (item: ExtractNestedArrayType<T[]>) => U
): FlatArrayWithIteratee<T[], D, U>[];

// 함수 구현체
export function deepFlatMap<T, D extends number, U>(
  arr: T[] | readonly T[],
  depth = 1 as D,
  iteratee?: (item: ExtractNestedArrayType<T[]>) => U
) {
  if (depth < 1 || !arr.length) {
    return arr as FlatArray<T[], D>;
  }

  if (!iteratee) {
    return arr.flat(depth) as FlatArray<T[], D>;
  }

  const recursiveFlat = (
    arr: T[] | readonly T[],
    currentDepth: number
  ): (T | U)[] => {
    if (currentDepth > depth) return [arr as T];

    return arr.flatMap((item) => {
      if (Array.isArray(item)) {
        return recursiveFlat(item, currentDepth + 1);
      }
      return iteratee(item as ExtractNestedArrayType<T[]>);
    });
  };

  return recursiveFlat(arr, 0) as FlatArrayWithIteratee<T[], D, U>[];
}
