import { contain } from '.';

describe('contain', () => {
  it('should return true if the array contains the element, otherwise return false.', () => {
    const arr = [0, 1, 2, 'foo', NaN, {}];

    expect(contain(arr, 1)).toBeTruthy();
    expect(contain(arr, 'foo')).toBeTruthy();
    expect(contain(arr, NaN)).toBeTruthy();

    expect(contain(arr, 4)).toBeFalsy();
    expect(contain(arr, {})).toBeFalsy();
    expect(contain(arr, -0)).toBeFalsy();
    expect(contain(arr, '2')).toBeFalsy();
  });

  it('should determine inclusion based on the result of the comparator function if provided.', () => {
    const arr = [{ a: 1, b: 2 }];

    expect(contain(arr, { a: 1, c: 2 }, (x, y) => x.a === y.a)).toBeTruthy();
    expect(
      contain(
        arr,
        { a: 1, b: 2 },
        (x, y) => JSON.stringify(x) === JSON.stringify(y)
      )
    ).toBeTruthy();
  });

  it('should perform type narrowing with conditional expressions.', () => {
    const arr = [2, 3, 'foo'] as const;
    const value = 'foo' as unknown;

    if (contain(arr, value)) {
      expectTypeOf(value).toEqualTypeOf<2 | 3 | 'foo'>();
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>();
    }
  });
});
