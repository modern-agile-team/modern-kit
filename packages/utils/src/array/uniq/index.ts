export function uniq<T, U = T>(
  arr: T[] | readonly T[],
  iteratee?: (item: T) => U
) {
  if (!iteratee) {
    return Array.from(new Set(arr));
  }

  const set = new Set<U>();
  const result: T[] = [];

  for (const item of arr) {
    const appliedIterateeItem = iteratee(item);

    if (set.has(appliedIterateeItem)) continue;

    set.add(appliedIterateeItem);
    result.push(item);
  }

  return result;
}
