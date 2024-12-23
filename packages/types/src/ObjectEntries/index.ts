import { ObjectKeys } from '../ObjectKeys';

export type ObjectEntries<T extends Record<PropertyKey, any>> = [
  ObjectKeys<T>,
  T[ObjectKeys<T>]
][];
