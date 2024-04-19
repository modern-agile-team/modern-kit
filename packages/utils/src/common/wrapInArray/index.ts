import { deepCopy } from '../deepCopy';

export const wrapInArray = <T>(value: T | T[]): T[] => {
  const copiedValue = deepCopy(value);

  return Array.isArray(copiedValue) ? copiedValue : [copiedValue];
};
