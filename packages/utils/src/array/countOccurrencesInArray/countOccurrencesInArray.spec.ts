import { countOccurrencesInArray } from '.';

describe('countOccurrencesInArray', () => {
  it('should count occurrences of each value correctly', () => {
    const testArray1 = [
      'foo',
      'foo',
      'foo',
      1,
      1,
      false,
      false,
      null,
      null,
      undefined,
      NaN,
      [1], // exclude
      { a: 1 }, // exclude
      new Set(), // exclude
      new Map(), // exclude
    ];

    expect(countOccurrencesInArray(testArray1)).toEqual({
      foo: 3,
      1: 2,
      false: 2,
      null: 2,
      undefined: 1,
      NaN: 1,
    });

    const testArray2: string[] = [];

    expect(countOccurrencesInArray(testArray2)).toEqual({});
  });

  it('should correctly type the result object based on input array types', () => {
    const readonlyTestArray = [
      'foo',
      'foo',
      'bar',
      1,
      2,
      [1], // exclude
      { a: 1 }, // exclude
    ] as const;

    expectTypeOf(countOccurrencesInArray(readonlyTestArray)).toEqualTypeOf<
      Record<'foo' | 1 | 2 | 'bar', number>
    >();

    const defaultTestArray = [
      'foo',
      'foo',
      'bar',
      1,
      2,
      [1], // exclude
      { a: 1 }, // exclude
    ];

    expectTypeOf(countOccurrencesInArray(defaultTestArray)).toEqualTypeOf<
      Record<string | number, number>
    >();
  });
});
