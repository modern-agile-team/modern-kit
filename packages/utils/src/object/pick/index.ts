import { ObjectKeys } from '@modern-kit/types';
import { deepCopy } from '../../common/deepCopy';
import { wrapInArray } from '../../common/wrapInArray';
import { hasProperty } from '../../validator';

export function pick<
  T extends Record<PropertyKey, T[keyof T]>,
  K extends ObjectKeys<T>
>(obj: T, keys: K | K[]): Pick<Record<ObjectKeys<T>, T[ObjectKeys<T>]>, K> {
  const result = {} as T;
  const deepCopiedObj = deepCopy(obj);
  const wrappedInArrayKeys = wrapInArray(keys);

  for (const key of wrappedInArrayKeys) {
    if (hasProperty(deepCopiedObj, key)) {
      result[key] = deepCopiedObj[key];
    }
  }

  return result;
}
