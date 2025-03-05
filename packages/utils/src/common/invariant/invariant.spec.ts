import { describe, expect, expectTypeOf, it } from 'vitest';
import { invariant } from '.';

describe('invariant', () => {
  it('조건이 참일 때 에러를 발생시키지 않아야 합니다', () => {
    expect(() =>
      invariant(true, '값이 false일 때 에러가 발생해야 합니다')
    ).not.toThrow();

    const value1 = 'some value';
    expect(() =>
      invariant(
        value1 !== null && value1 !== undefined,
        '값이 null이거나 undefined일 때 에러가 발생해야 합니다'
      )
    ).not.toThrow();

    const value2 = null;
    expect(() =>
      invariant(
        value2 !== null && value2 !== undefined,
        '값이 null이거나 undefined일 때 에러가 발생해야 합니다'
      )
    ).toThrow('값이 null이거나 undefined일 때 에러가 발생해야 합니다');

    const number = 5;
    expect(() => invariant(number > 0, '숫자가 양수여야 합니다')).not.toThrow();
  });

  it('조건이 거짓일 때 에러를 발생시켜야 합니다', () => {
    expect(() => invariant(false, '에러가 발생해야 합니다')).toThrow(
      '에러가 발생해야 합니다'
    );

    const value1 = undefined;
    expect(() =>
      invariant(
        value1 !== null && value1 !== undefined,
        '값이 null이거나 undefined일 때 에러가 발생해야 합니다'
      )
    ).toThrow('값이 null이거나 undefined일 때 에러가 발생해야 합니다');

    const number = -1;
    expect(() => invariant(number > 0, '숫자가 양수여야 합니다')).toThrow(
      '숫자가 양수여야 합니다'
    );
  });

  it('null이 아닌 값을 문자열로 처리하고 타입을 단언해야 합니다', () => {
    const value = '@modern-kit' as string | null;

    invariant(value !== null, '값이 null이면 안됩니다');

    // Narrow the type.
    expectTypeOf(value).toEqualTypeOf<string>();
  });
});
