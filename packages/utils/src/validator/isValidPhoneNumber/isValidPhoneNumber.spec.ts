import { describe, it, expect } from 'vitest';
import { isValidPhoneNumber } from '.';

describe('isValidPhoneNumber', () => {
  it('전화 번호 형식이 유효한 경우 true를 반환해야 합니다.', () => {
    expect(isValidPhoneNumber('010-1234-1234')).toBeTruthy();
    expect(isValidPhoneNumber('031-123-1234')).toBeTruthy();
    expect(isValidPhoneNumber('02-123-1234')).toBeTruthy();
    expect(isValidPhoneNumber('02-1234-1234')).toBeTruthy();
    expect(isValidPhoneNumber('1234-1234')).toBeTruthy();
  });

  it('전화 번호 형식이 유효하지 않은 경우 false를 반환해야 합니다.', () => {
    expect(isValidPhoneNumber('0-1234-1234')).toBeFalsy();
    expect(isValidPhoneNumber('0101-123-1234')).toBeFalsy();
    expect(isValidPhoneNumber('010-12-1234')).toBeFalsy();
    expect(isValidPhoneNumber('010-12455-1234')).toBeFalsy();
    expect(isValidPhoneNumber('01012551234')).toBeFalsy();
  });
});
