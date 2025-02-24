import { describe, it, expect, expectTypeOf } from 'vitest';
import { isArray } from '.';

describe('isArray', () => {
  it('배열인 경우 true를, 그렇지 않은 경우 false를 반환해야 합니다.', () => {
    expect(isArray([])).toBeTruthy();
    expect(isArray(1)).toBeFalsy();
    expect(isArray('')).toBeFalsy();
    expect(isArray({})).toBeFalsy();
  });

  it('if문을 통해 타입을 좁혀야 합니다.', () => {
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
