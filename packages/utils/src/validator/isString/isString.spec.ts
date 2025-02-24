import { describe, it, expect, expectTypeOf } from 'vitest';
import { isString } from '.';

describe('isString', () => {
  it('문자열인 경우 true를, 그렇지 않은 경우 false를 반환해야 합니다.', () => {
    expect(isString('123')).toBeTruthy();

    expect(isString(() => {})).toBeFalsy();
    expect(isString(true)).toBeFalsy();
    expect(isString(123)).toBeFalsy();
    expect(isString({})).toBeFalsy();
    expect(isString([])).toBeFalsy();
  });

  it('isString이 true를 반환하는 경우 타입을 string으로 좁혀야 합니다.', () => {
    const str = '123' as string | number;

    if (isString(str)) {
      expectTypeOf(str).toEqualTypeOf<string>();
    } else {
      expectTypeOf(str).toEqualTypeOf<number>();
    }
  });
});
