import { describe, it, expect, expectTypeOf } from 'vitest';
import { isBoolean } from '.';

describe('isBoolean', () => {
  it('불리언인 경우 true를, 그렇지 않은 경우 false를 반환해야 합니다.', () => {
    expect(isBoolean(true)).toBeTruthy();
    expect(isBoolean(false)).toBeTruthy();

    expect(isBoolean(() => {})).toBeFalsy();
    expect(isBoolean('123')).toBeFalsy();
    expect(isBoolean(123)).toBeFalsy();
    expect(isBoolean({})).toBeFalsy();
    expect(isBoolean([])).toBeFalsy();
  });

  it('isBoolean이 true를 반환하는 경우 타입을 boolean으로 좁혀야 합니다.', () => {
    const boolean = 'true' as boolean | string;

    if (isBoolean(boolean)) {
      expectTypeOf(boolean).toEqualTypeOf<boolean>();
    } else {
      expectTypeOf(boolean).toEqualTypeOf<string>();
    }
  });
});
