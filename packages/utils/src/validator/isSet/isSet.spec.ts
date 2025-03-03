import { describe, it, expect, expectTypeOf } from 'vitest';
import { isSet } from '.';

describe('isSet', () => {
  it('Set 객체인 경우 true를, 그렇지 않은 경우 false를 반환해야 합니다.', () => {
    expect(isSet(new Set())).toBeTruthy();
    expect(isSet(new Set([1, 2, 3]))).toBeTruthy();
    expect(isSet([])).toBeFalsy();
    expect(isSet({})).toBeFalsy();
    expect(isSet(1)).toBeFalsy();
    expect(isSet('')).toBeFalsy();
    expect(isSet(null)).toBeFalsy();
    expect(isSet(undefined)).toBeFalsy();
  });

  it('if문을 통해 타입을 좁혀야 합니다.', () => {
    const testValue = new Set(['foo']) as Set<string> | string;

    if (isSet(testValue)) {
      expectTypeOf(testValue).toEqualTypeOf<Set<string>>();
    } else {
      expectTypeOf(testValue).toEqualTypeOf<string>();
    }
  });
});
