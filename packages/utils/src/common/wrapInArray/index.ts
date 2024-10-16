import { cloneDeep } from '../cloneDeep';

export function wrapInArray<T>(value: T | T[]): T[] {
  const copiedValue = cloneDeep(value);

  return Array.isArray(copiedValue) ? copiedValue : [copiedValue];
}
