export const intersection = <T>(
  arr1: T[] | readonly T[],
  arr2: T[] | readonly T[],
  comparator: (x: T, y: T) => boolean = Object.is,
) => {
  const hashSet = new Set(arr1);

  const intersectionList = [];
  const checked = new Set<T>();

  for (const arr1Item of hashSet) {
    for (const arr2Item of arr2) {
      if (comparator(arr1Item, arr2Item) && !checked.has(arr2Item)) {
        intersectionList.push(arr2Item);
        checked.add(arr2Item);
        break;
      }
    }
  }

  return intersectionList;
};
