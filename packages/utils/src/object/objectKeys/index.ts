import { ObjectKeys } from '../types';

export const objectKeys = <T extends Record<ObjectKeys<T>, T[keyof T]>>(
  obj: T
): ObjectKeys<T>[] => {
  return Object.keys(obj) as ObjectKeys<T>[];
};
