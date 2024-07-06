import { deepEqual } from '../../common/deepEqual';

const goDeepEqual = <T, U>(
  baseArray: readonly T[] | U[],
  cmpArray: readonly T[] | U[]
) => {
  return (cmpArray as any).every((cObj: T | U) =>
    baseArray.some((bObj: T | U) => deepEqual(bObj, cObj))
  );
};

export const isSubset = <T, U>(
  parentArray: readonly T[],
  childArray: readonly T[],
  iteratee?: (item: T) => U
) => {
  const baseArray = iteratee ? parentArray.map(iteratee) : parentArray;
  const cmpArray = iteratee ? childArray.map(iteratee) : childArray;

  // 배열 요소가 참조형인 경우
  if (typeof baseArray[0] === 'object') {
    return goDeepEqual(baseArray, cmpArray);
  }

  // 배열 요소가 원시값인 경우 (Set 적용)
  const baseSet = new Set<T | U>(baseArray);

  return (cmpArray as any).every((el: T | U) => baseSet.has(el));
};
