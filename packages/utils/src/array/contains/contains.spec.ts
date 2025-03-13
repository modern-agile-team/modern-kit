import { describe, it, expect, expectTypeOf } from 'vitest';
import { contains } from '.';

describe('contains', () => {
  it('배열에 요소가 포함되어 있으면 true를 반환하고, 그렇지 않으면 false를 반환해야 합니다.', () => {
    const arr = [0, 1, 2, 'foo', NaN, {}];

    expect(contains(arr, 1)).toBeTruthy();
    expect(contains(arr, 'foo')).toBeTruthy();
    expect(contains(arr, NaN)).toBeTruthy();

    expect(contains(arr, 4)).toBeFalsy();
    expect(contains(arr, {})).toBeFalsy();
    expect(contains(arr, -0)).toBeFalsy();
    expect(contains(arr, '2')).toBeFalsy();
  });

  it('제공된 경우 비교기 함수의 결과를 기준으로 포함 여부를 결정해야 합니다.', () => {
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

  it('조건부 표현식으로 타입 좁히기를 수행해야 합니다.', () => {
    const arr = [2, 3, 'foo'] as const;
    const value = 'foo' as unknown;

    if (contains(arr, value)) {
      expectTypeOf(value).toEqualTypeOf<2 | 3 | 'foo'>();
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>();
    }
  });
});
