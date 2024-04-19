import { ObjectKeys } from '../types';

export const objectEntries = <T extends Record<PropertyKey, T[keyof T]>>(
  obj: T
): [ObjectKeys<T>, T[ObjectKeys<T>]][] => {
  return Object.entries(obj) as [ObjectKeys<T>, T[ObjectKeys<T>]][];
};
