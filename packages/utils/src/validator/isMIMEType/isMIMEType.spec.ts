import { describe, it, expect, expectTypeOf } from 'vitest';
import { isMIMEType, MIMEType } from '.';

describe('isMIMEType', () => {
  it('MIME 타입인 경우 true를, 그렇지 않은 경우 false를 반환해야 합니다.', () => {
    expect(isMIMEType('image/png')).toBeTruthy();
    expect(isMIMEType('application/json')).toBeTruthy();

    expect(isMIMEType('')).toBeFalsy();
    expect(isMIMEType('abc')).toBeFalsy();
    expect(isMIMEType([])).toBeFalsy();
    expect(isMIMEType({})).toBeFalsy();
    expect(isMIMEType(123)).toBeFalsy();
  });

  it('isMIMEType이 true를 반환하는 경우 타입을 MIMEType으로 좁혀야 합니다.', () => {
    const str = 'image/png' as string;

    if (isMIMEType(str)) {
      expectTypeOf(str).toEqualTypeOf<MIMEType>();
    } else {
      expectTypeOf(str).toEqualTypeOf<string>();
    }
  });
});
