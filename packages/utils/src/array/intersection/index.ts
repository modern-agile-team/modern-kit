import { uniq } from '../../array/uniq';
import { intersectionWithDuplicates } from '../intersectionWithDuplicates';

export function intersection<T, U>(
  firstArr: T[] | readonly T[],
  secondArr: T[] | readonly T[],
  iteratee?: (item: T) => U
) {
  const intersection = intersectionWithDuplicates(
    firstArr,
    secondArr,
    iteratee
  );

  return uniq(intersection, iteratee);
}
