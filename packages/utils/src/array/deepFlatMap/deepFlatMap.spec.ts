import { deepFlatMap } from '.';

describe('deepFlatMap', () => {
  const arr = [1, 2, [3, 4, [5, 6]]]; // type: (number | (number | number[])[])[]

  it('should flatten the array to the default depth of 1 if no depth is provided', () => {
    const flattenArray = deepFlatMap(arr);

    expect(flattenArray).toEqual([1, 2, 3, 4, [5, 6]]);
    expectTypeOf(flattenArray).toEqualTypeOf<(number | number[])[]>();
  });

  it('는 배열을 지정된 깊이로 평평하게 만들어야 합니다.', () => {
    const flattenArray1 = deepFlatMap(arr, 0);
    const flattenArray2 = deepFlatMap(arr, 1);
    const flattenArray3 = deepFlatMap(arr, 2);

    expect(flattenArray1).toEqual(arr);
    expectTypeOf(flattenArray1).toEqualTypeOf<
      (number | (number | number[])[])[]
    >();

    expect(flattenArray2).toEqual([1, 2, 3, 4, [5, 6]]);
    expectTypeOf(flattenArray2).toEqualTypeOf<(number | number[])[]>();

    expect(flattenArray3).toEqual([1, 2, 3, 4, 5, 6]);
    expectTypeOf(flattenArray3).toEqualTypeOf<number[]>();
  });

  it('should apply the iteratee function to each element and flatten the array to the specified depth', () => {
    const flattenArray1 = deepFlatMap(arr, 1, (item) => ({ id: item }));
    const flattenArray2 = deepFlatMap(arr, 2, (item) => ({ id: item }));

    expect(flattenArray1).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      [5, 6],
    ]);
    expectTypeOf(flattenArray1).toEqualTypeOf<
      (
        | number[]
        | {
            id: number;
          }
      )[]
    >();

    expect(flattenArray2).toEqual([
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ]);
    expectTypeOf(flattenArray2).toEqualTypeOf<{ id: number }[]>();
  });

  it('should handle edge cases like empty array, negative depth, and NaN depth correctly', () => {
    expect(deepFlatMap([], 1)).toEqual([]); // empty Array

    expect(deepFlatMap(arr, -10)).toEqual(arr); // 음수
    expect(deepFlatMap(arr, NaN)).toEqual(arr); // NaN
  });
});
