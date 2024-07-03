import { flatMapDeep } from '.';

describe('flatMapDeep', () => {
  const arr = [1, 2, [3, 4, [5, 6]]];

  it('should flatten the array', () => {
    const flattenArray = flatMapDeep(arr);

    expect(flattenArray).toEqual([1, 2, 3, 4, 5, 6]);
    expectTypeOf(flattenArray).toEqualTypeOf<number[]>();
  });

  it('should apply the iteratee function to each element and flatten', () => {
    const flattenArray = flatMapDeep(arr, (item) => ({ id: item }));
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
    expect(flatMapDeep([])).toEqual([]);
  });
});
