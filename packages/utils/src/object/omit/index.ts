import { deepCopy } from '../../common';

export function omit<T extends Record<PropertyKey, any>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = deepCopy(obj);

  for (const key of keys) {
    delete result[key];
  }

  return result;
}
