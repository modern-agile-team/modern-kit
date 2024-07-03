import { deepFlatThenMap } from '.';

describe('deepFlatThenMap', () => {
  const arr = [1, 2, [3, 4, [5, 6]]];
  const mixedArr = [1, 2, ['123', 4, [true, 6]]];

  it('should flatten the array', () => {
    const flattenArray = deepFlatThenMap(arr);

    expect(flattenArray).toEqual([1, 2, 3, 4, 5, 6]);
    expectTypeOf(flattenArray).toEqualTypeOf<number[]>();

    const flattenMixedArray = deepFlatThenMap(mixedArr);

    expect(flattenMixedArray).toEqual([1, 2, '123', 4, true, 6]);
    expectTypeOf(flattenMixedArray).toEqualTypeOf<
      (string | number | boolean)[]
    >();
  });

  it('should apply the iteratee function to each element and flatten', () => {
    const flattenArray = deepFlatThenMap(arr, (item) => ({ id: item }));
    expect(flattenArray).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ]);
    expectTypeOf(flattenArray).toEqualTypeOf<{ id: number }[]>();
  });

  it('should handle edge cases like empty array', () => {
    expect(deepFlatThenMap([])).toEqual([]);
  });
});
