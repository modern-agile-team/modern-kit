import { describe, it, expect, expectTypeOf } from 'vitest';
import { Primitive } from '@modern-kit/types';
import { isPrimitive } from '.';
import { isNumber } from '../isNumber';
import { isString } from '../isString';

describe('isPrimitive', () => {
  it('should return true if the value is a primitive type, and false if it is a reference type', () => {
    expect(isPrimitive(null)).toBeTruthy();
    expect(isPrimitive(undefined)).toBeTruthy();
    expect(isPrimitive(1)).toBeTruthy();
    expect(isPrimitive(BigInt(1))).toBeTruthy();
    expect(isPrimitive('')).toBeTruthy();
    expect(isPrimitive(false)).toBeTruthy();
    expect(isPrimitive(Symbol())).toBeTruthy();

    expect(isPrimitive([])).toBeFalsy();
    expect(isPrimitive({})).toBeFalsy();
    expect(isPrimitive(new Set())).toBeFalsy();
    expect(isPrimitive(new Map())).toBeFalsy();
  });

  it('should properly infer the type', () => {
    const value = 1 as unknown;

    if (isPrimitive(value)) {
      expectTypeOf(value).toEqualTypeOf<Primitive>();

      if (isNumber(value)) {
        expectTypeOf(value).toEqualTypeOf<number>();
      }

      if (isString(value)) {
        expectTypeOf(value).toEqualTypeOf<string>();
      }
    } else {
      expectTypeOf(value).toEqualTypeOf<unknown>();
    }
  });
});
