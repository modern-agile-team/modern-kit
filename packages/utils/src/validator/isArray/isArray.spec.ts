import { isArray } from '.';

describe('isArray', () => {
  it('should return true if the argument is an array, and false if it is not', () => {
    expect(isArray([])).toBeTruthy();
    expect(isArray(1)).toBeFalsy();
    expect(isArray('')).toBeFalsy();
    expect(isArray({})).toBeFalsy();
  });

  it('should narrow the type through if statements', () => {
    const testValue = ['foo'] as string | string[];

    if (isArray<string>(testValue)) {
      expectTypeOf(testValue).toEqualTypeOf<string[]>();
    } else {
      expectTypeOf(testValue).toEqualTypeOf<string>();
    }
  });
});
