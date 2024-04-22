import { ObjectKeys } from '@modern-kit/types';
import { deepCopy } from '../../common/deepCopy';
import { wrapInArray } from '../../common/wrapInArray';

export const omit = <
  T extends Record<PropertyKey, T[keyof T]>,
  K extends ObjectKeys<T>
>(
  obj: T,
  keys: K | K[]
): Omit<Record<ObjectKeys<T>, T[ObjectKeys<T>]>, K> => {
  const result = deepCopy(obj);
  const wrappedInArrayKeys = wrapInArray(keys);

  wrappedInArrayKeys.forEach((key) => {
    if (key in result) {
      delete result[key];
    }
  });

  return result;
};
