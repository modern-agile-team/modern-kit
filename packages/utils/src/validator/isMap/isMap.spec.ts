import { describe, it, expect, expectTypeOf } from 'vitest';
import { isMap as isMap } from '.';

describe('isMap', () => {
  it('Map인 경우 true를, 그렇지 않은 경우 false를 반환해야 합니다.', () => {
    expect(isMap(new Map())).toBeTruthy();
    expect(isMap(new Map([['foo', 1]]))).toBeTruthy();
    expect(isMap(1)).toBeFalsy();
    expect(isMap('')).toBeFalsy();
    expect(isMap({})).toBeFalsy();
    expect(isMap(true)).toBeFalsy();
    expect(isMap(null)).toBeFalsy();
    expect(isMap(undefined)).toBeFalsy();
  });

  it('if문을 통해 타입을 좁혀야 합니다.', () => {
    const maybeMap = new Map([['foo', 1]]) as Map<string, number> | string;

    if (isMap(maybeMap)) {
      expectTypeOf(maybeMap).toEqualTypeOf<Map<string, number>>();
    } else {
      expectTypeOf(maybeMap).toEqualTypeOf<string>();
    }
  });
});
