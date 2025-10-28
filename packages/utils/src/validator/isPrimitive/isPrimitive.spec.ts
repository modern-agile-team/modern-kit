import { describe, it, expect, expectTypeOf } from 'vitest';
import { type Primitive, isPrimitive } from '.';
import { isNumber } from '../isNumber';
import { isString } from '../isString';

describe('isPrimitive', () => {
  it('원시 타입인 경우 true를, 참조 타입인 경우 false를 반환해야 합니다.', () => {
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

  it('타입을 올바르게 추론해야 합니다.', () => {
    const value = 1 as unknown;

    if (isPrimitive(value)) {
      expectTypeOf(value).toEqualTypeOf<Primitive>();

      if (isNumber(value)) {
        expectTypeOf(value).toEqualTypeOf<number>();
      }

      if (isString(value)) {
        expectTypeOf(value).toEqualTypeOf<string>();
      }
    }
  });
});
