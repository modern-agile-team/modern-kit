type UnwrapArrayType<T> = T extends readonly (infer U)[]
  ? UnwrapArrayType<U>
  : T;

// 함수 오버로딩
// 1. depth 존재하지 않을 때
export function deepFlatMap<T>(arr: T[] | readonly T[]): FlatArray<T[], 1>[];

// 2. depth 존재 할 때
export function deepFlatMap<T, D extends number>(
  arr: T[] | readonly T[],
  depth: D
): FlatArray<T[], D>[];

// 3. iteratee 반환 타입(U)이 T에 호환 될 때
export function deepFlatMap<T, U extends T, D extends number>(
  arr: T[] | readonly T[],
  depth: D,
  iteratee: (item: UnwrapArrayType<T>) => U
): FlatArray<T[], D>[];

// 4. iteratee 반환 타입(U)이 T에 호환 되지 않을 때
export function deepFlatMap<T, U, D extends number>(
  arr: T[] | readonly T[],
  depth: D,
  iteratee: (item: UnwrapArrayType<T>) => U
): FlatArray<U[], D>[];

// 함수 구현체
export function deepFlatMap<T, U, D extends number>(
  arr: T[] | readonly T[],
  depth = 1 as D,
  iteratee?: (item: UnwrapArrayType<T>) => U
) {
  if (!Number.isInteger(depth) || depth < 1) {
    return arr;
  }

  if (!iteratee) {
    return arr.flat(depth);
  }

  const executeFlat = (
    arr: T[] | readonly T[],
    currentDepth: number
  ): U[] | readonly U[] => {
    if (currentDepth > depth) return [arr as U];

    return arr.flatMap((item) => {
      if (Array.isArray(item)) {
        return executeFlat(item, currentDepth + 1);
      }
      return iteratee(item as UnwrapArrayType<T>);
    });
  };

  return executeFlat(arr, 0);
}
