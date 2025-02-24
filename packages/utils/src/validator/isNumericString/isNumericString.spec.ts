import { describe, expect, it } from 'vitest';
import { isNumericString } from '.';

describe('isNumericString', () => {
  it('숫자로만 이루어진 문자열인 경우 true를 반환해야 합니다.', () => {
    expect(isNumericString('123')).toBeTruthy();
    expect(isNumericString('0')).toBeTruthy();
  });

  it('숫자로만 이루어지지 않은 문자열인 경우 false를 반환해야 합니다.', () => {
    expect(isNumericString('-123')).toBeFalsy();
    expect(isNumericString('1a')).toBeFalsy();
    expect(isNumericString('1@')).toBeFalsy();
    expect(isNumericString('1[]')).toBeFalsy();
    expect(isNumericString('12.00')).toBeFalsy();
  });

  it('sign 옵션이 활성화된 경우 부호와 소수점이 포함된 숫자 문자열을 올바르게 검증해야 합니다.', () => {
    expect(isNumericString('123.45', { sign: true })).toBeTruthy();
    expect(isNumericString('-123.45', { sign: true })).toBeTruthy();

    expect(isNumericString('12.3a45', { sign: true })).toBeFalsy();
    expect(isNumericString('12-345', { sign: true })).toBeFalsy();
    expect(isNumericString('123.', { sign: true })).toBeFalsy();
  });
});
