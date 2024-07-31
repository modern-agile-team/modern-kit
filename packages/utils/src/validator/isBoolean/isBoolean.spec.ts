import { describe, it, expect, expectTypeOf } from 'vitest';
import { isBoolean } from '.';

describe('isBoolean', () => {
  it('should return true if the argument is a boolean and false otherwise', () => {
    expect(isBoolean(true)).toBeTruthy();
    expect(isBoolean(false)).toBeTruthy();

    expect(isBoolean(() => {})).toBeFalsy();
    expect(isBoolean('123')).toBeFalsy();
    expect(isBoolean(123)).toBeFalsy();
    expect(isBoolean({})).toBeFalsy();
    expect(isBoolean([])).toBeFalsy();
  });

  it('should narrow the type to boolean if isBoolean returns true', () => {
    const boolean = 'true' as boolean | string;

    if (isBoolean(boolean)) {
      expectTypeOf(boolean).toEqualTypeOf<boolean>();
    } else {
      expectTypeOf(boolean).toEqualTypeOf<string>();
    }
  });
});
