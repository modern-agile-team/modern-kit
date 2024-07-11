import { isArray } from '.';

describe.concurrent('isArray', () => {
  it('should return true if the argument is an array, and false if it is not', () => {
    expect(isArray([])).toBeTruthy();
    expect(isArray(1)).toBeFalsy();
    expect(isArray('')).toBeFalsy();
    expect(isArray({})).toBeFalsy();
  });

  it('should narrow the type through if statements', () => {
    const defaultTestArray = ['foo'] as string | string[];

    if (isArray(defaultTestArray)) {
      expectTypeOf(defaultTestArray).toEqualTypeOf<string[]>();
    } else {
      expectTypeOf(defaultTestArray).toEqualTypeOf<string>();
    }

    const readonlyTestArray = ['foo'] as const;

    if (isArray(readonlyTestArray)) {
      expectTypeOf(readonlyTestArray).toEqualTypeOf<readonly ['foo']>();
    }
  });
});
