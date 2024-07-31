import { ObjectKeys } from '@modern-kit/types';

export function objectValues<T extends Record<PropertyKey, T[keyof T]>>(
  obj: T
): T[ObjectKeys<T>][] {
  return Object.values(obj) as T[ObjectKeys<T>][];
}
