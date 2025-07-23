import { describe, expect, it } from 'vitest';
import { isHangul } from '.';

describe('isHangul', () => {
  it('문자열이 한글로 이루어져 있으면 true를 반환해야 합니다.', () => {
    expect(isHangul('안녕하세요')).toBeTruthy();
  });

  it('문자열이 한글로 이루어져 있지 않으면 false를 반환해야 합니다.', () => {
    expect(isHangul('Hello')).toBeFalsy();
    expect(isHangul('123')).toBeFalsy();
    expect(isHangul('!@#')).toBeFalsy();
    expect(isHangul('')).toBeFalsy();
  });
});
