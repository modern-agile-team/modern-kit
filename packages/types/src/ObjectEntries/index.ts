import { ObjectKeys } from '../ObjectKeys';

export type ObjectEntries<T extends Record<PropertyKey, T[keyof T]>> = [
  ObjectKeys<T>,
  T[ObjectKeys<T>]
][];
