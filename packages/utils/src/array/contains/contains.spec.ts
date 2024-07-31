import { describe, it, expect, expectTypeOf } from 'vitest';
import { contains } from '.';

describe('contains', () => {
  it('should return true if the array contains the element, otherwise return false.', () => {
    const arr = [0, 1, 2, 'foo', NaN, {}];

    expect(contains(arr, 1)).toBeTruthy();
    expect(contains(arr, 'foo')).toBeTruthy();
    expect(contains(arr, NaN)).toBeTruthy();

    expect(contains(arr, 4)).toBeFalsy();
    expect(contains(arr, {})).toBeFalsy();
    expect(contains(arr, -0)).toBeFalsy();
    expect(contains(arr, '2')).toBeFalsy();
  });

  it('should determine inclusion based on the result of the comparator function if provided.', () => {
    const arr = [{ a: 1, b: 2 }];

    expect(contains(arr, { a: 1, c: 2 }, (x, y) => x.a === y.a)).toBeTruthy();
    expect(
      contains(
        arr,
        { a: 1, b: 2 },
        (x, y) => JSON.stringify(x) === JSON.stringify(y)
      )
    ).toBeTruthy();
  });

  it('should perform type narrowing with conditional expressions.', () => {
    const arr = [2, 3, 'foo'] as const;
    const value = 'foo' as unknown;

    if (contains(arr, value)) {
      expectTypeOf(value).toEqualTypeOf<2 | 3 | 'foo'>();
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>();
    }
  });
});
