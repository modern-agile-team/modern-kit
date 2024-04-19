import { ObjectKeys } from '../types';
import { deepCopy } from '../../common/deepCopy';
import { wrapInArray } from '../../common/wrapInArray';

export const pick = <
  T extends Record<PropertyKey, T[keyof T]>,
  K extends ObjectKeys<T>
>(
  obj: T,
  keys: K | K[]
): Pick<Record<ObjectKeys<T>, T[ObjectKeys<T>]>, K> => {
  const result = {} as T;
  const deepCopiedObj = deepCopy(obj);
  const wrappedInArrayKeys = wrapInArray(keys);

  wrappedInArrayKeys.forEach((key) => {
    if (key in deepCopiedObj) {
      result[key] = deepCopiedObj[key];
    }
  });

  return result;
};
