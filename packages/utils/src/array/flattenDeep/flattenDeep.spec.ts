import { describe, it, expect, expectTypeOf } from 'vitest';
import { flattenDeep } from '.';

describe('flattenDeep', () => {
  it('깊게 중첩된 숫자 배열을 평탄화해야 합니다.', () => {
    const arr = [1, [2, [3, [4, [5]]]]];
    const flattenedArray = flattenDeep(arr);

    expect(flattenedArray).toEqual([1, 2, 3, 4, 5]);
    expectTypeOf(flattenedArray).toEqualTypeOf<number[]>();
  });

  it('깊게 중첩된 혼합 타입 배열을 평탄화해야 합니다.', () => {
    const arr = [1, ['str', [3, [4, [false, [{ id: 1 }]]]]]];
    const flattenedArray = flattenDeep(arr);

    expect(flattenedArray).toEqual([1, 'str', 3, 4, false, { id: 1 }]);
    expectTypeOf(flattenedArray).toEqualTypeOf<
      (string | number | boolean | { id: number })[]
    >();
  });
});
