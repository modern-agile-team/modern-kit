import { describe, it, expect, expectTypeOf } from 'vitest';
import { isRegExp } from '.';

describe('isRegExp', () => {
  it('RegExp 인스턴스일 경우 true를, 그렇지 않은 경우 false를 반환해야 합니다..', () => {
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp(new RegExp('abc'))).toBe(true);
    expect(isRegExp('abc')).toBe(false);
    expect(isRegExp(123)).toBe(false);
    expect(isRegExp({})).toBe(false);
    expect(isRegExp([])).toBe(false);
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp(undefined)).toBe(false);
    expect(isRegExp(() => {})).toBe(false);
    expect(isRegExp(Symbol('test'))).toBe(false);
  });

  it('if문을 통해 타입을 좁혀야 합니다.', () => {
    const testValue = /abc/ as RegExp | string;

    if (isRegExp(testValue)) {
      expectTypeOf(testValue).toEqualTypeOf<RegExp>();
    } else {
      expectTypeOf(testValue).toEqualTypeOf<string>();
    }
  });
});
