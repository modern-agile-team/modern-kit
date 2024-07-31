import { describe, it, expect, expectTypeOf } from 'vitest';
import { flattenDeep } from '.';

describe('flatten', () => {
  it('should flatten a deeply nested array of numbers', () => {
    const arr = [1, [2, [3, [4, [5]]]]];
    const flattenedArray = flattenDeep(arr);

    expect(flattenedArray).toEqual([1, 2, 3, 4, 5]);
    expectTypeOf(flattenedArray).toEqualTypeOf<number[]>();
  });

  it('should flatten a deeply nested array with mixed types', () => {
    const arr = [1, ['str', [3, [4, [false, [{ id: 1 }]]]]]];
    const flattenedArray = flattenDeep(arr);

    expect(flattenedArray).toEqual([1, 'str', 3, 4, false, { id: 1 }]);
    expectTypeOf(flattenedArray).toEqualTypeOf<
      (string | number | boolean | { id: number })[]
    >();
  });
});
