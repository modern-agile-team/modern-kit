import { describe, it, expect, expectTypeOf } from 'vitest';
import { countOccurrencesInArray } from '.';

describe('countOccurrencesInArray', () => {
  it('각 값의 발생 횟수를 정확하게 세어야 합니다', () => {
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
      [1], // 제외
      { a: 1 }, // 제외
      new Set(), // 제외
      new Map(), // 제외
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

  it('입력 배열 유형에 따라 결과 객체의 유형을 정확하게 지정해야 합니다', () => {
    const readonlyTestArray = [
      'foo',
      'foo',
      'bar',
      1,
      2,
      [1], // 제외
      { a: 1 }, // 제외
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
      [1], // 제외
      { a: 1 }, // 제외
    ];

    expectTypeOf(countOccurrencesInArray(defaultTestArray)).toEqualTypeOf<
      Record<string | number, number>
    >();
  });
});
