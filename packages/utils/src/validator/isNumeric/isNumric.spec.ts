import { describe, expect, it } from 'vitest';
import { isNumeric } from '.';

describe('isNumeric', () => {
  it('숫자로만 이루어진 문자열인 경우 true를 반환해야 합니다.', () => {
    expect(isNumeric('123')).toBeTruthy();
    expect(isNumeric('0')).toBeTruthy();
  });

  it('숫자로만 이루어지지 않은 문자열인 경우 false를 반환해야 합니다.', () => {
    expect(isNumeric('-123')).toBeFalsy();
    expect(isNumeric('1a')).toBeFalsy();
    expect(isNumeric('1@')).toBeFalsy();
    expect(isNumeric('1[]')).toBeFalsy();
    expect(isNumeric('12.00')).toBeFalsy();
  });

  it('sign 옵션이 활성화된 경우 부호와 소수점이 포함된 숫자 문자열을 올바르게 검증해야 합니다.', () => {
    expect(isNumeric('123.45', { sign: true })).toBeTruthy();
    expect(isNumeric('-123.45', { sign: true })).toBeTruthy();

    expect(isNumeric('12.3a45', { sign: true })).toBeFalsy();
    expect(isNumeric('12-345', { sign: true })).toBeFalsy();
    expect(isNumeric('123.', { sign: true })).toBeFalsy();
  });
});
