import { flatten } from '.';

describe('flatten', () => {
  it('should flatten a deeply nested array to the specified depth', () => {
    const arr = [1, [2, [3, [4, [5]]]]];

    const result1 = flatten(arr, 1);
    expect(result1).toEqual([1, 2, [3, [4, [5]]]]);
    expectTypeOf(result1).toEqualTypeOf<
      (number | (number | (number | number[])[])[])[]
    >();

    const result2 = flatten(arr, 2);
    expect(result2).toEqual([1, 2, 3, [4, [5]]]);
    expectTypeOf(result2).toEqualTypeOf<(number | (number | number[])[])[]>();

    const result3 = flatten(arr, 3);
    expect(result3).toEqual([1, 2, 3, 4, [5]]);
    expectTypeOf(result3).toEqualTypeOf<(number | number[])[]>();

    const result4 = flatten(arr, 4);
    expect(result4).toEqual([1, 2, 3, 4, 5]);
    expectTypeOf(result4).toEqualTypeOf<number[]>();
  });

  it('should return the same array if depth is 0 or NaN or negative', () => {
    const arr = [1, [2, 3], [4, 5]];

    const result1 = flatten(arr, 0);
    expect(result1).toEqual([1, [2, 3], [4, 5]]);

    const result2 = flatten(arr, NaN);
    expect(result2).toEqual([1, [2, 3], [4, 5]]);

    const result3 = flatten(arr, -1);
    expect(result3).toEqual([1, [2, 3], [4, 5]]);
  });

  it('should handle empty arrays', () => {
    const arr: any[] = [];
    const result = flatten(arr, 1);
    expect(result).toEqual([]);
  });

  it('should flatten a 2D array to the default depth of 1', () => {
    const arr = [1, [2, 3], [4, 5]];
    const result = flatten(arr);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  it('should handle arrays with mixed types', () => {
    const arr = [1, 'a', [true, false, [null, undefined]]];

    const result = flatten(arr, 2);
    expect(result).toEqual([1, 'a', true, false, null, undefined]);
    expectTypeOf(result).toEqualTypeOf<
      (string | number | boolean | null | undefined)[]
    >();
  });
});
