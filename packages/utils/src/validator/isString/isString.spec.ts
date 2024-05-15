import { isString } from '.';

describe('isString', () => {
  it('should return true if the argument is a string and false otherwise', () => {
    expect(isString('123')).toBeTruthy();

    expect(isString(() => {})).toBeFalsy();
    expect(isString(true)).toBeFalsy();
    expect(isString(123)).toBeFalsy();
    expect(isString({})).toBeFalsy();
    expect(isString([])).toBeFalsy();
  });

  it('should narrow the type to string if isString returns true', () => {
    const str = '123' as string | number;

    if (isString(str)) {
      expectTypeOf(str).toEqualTypeOf<string>();
    } else {
      expectTypeOf(str).toEqualTypeOf<number>();
    }
  });
});
