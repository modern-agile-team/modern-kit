import { describe, it, expect } from 'vitest';
import { wrapInArray } from '.';

describe('wrapInArray', () => {
  it('should wrap a non-array value in an array', () => {
    const strValue = 'ModernAgile';
    const wrappedInArray = wrapInArray('ModernAgile');

    expect(wrappedInArray).toEqual([strValue]);
  });

  it('should not wrap an array value in an array', () => {
    const arrayValue = [1, 2, 3];
    const wrappedInArray = wrapInArray(arrayValue);

    expect(wrappedInArray).toBe(arrayValue);
  });
});
