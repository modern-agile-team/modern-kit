import { describe, expect, it } from 'vitest';
import { isHangulAlphanumeric } from '.';

describe('isHangulAlphanumeric', () => {
  it('문자열이 한글 또는 알파벳 또는 숫자로 이루어져 있으면 true를 반환해야 합니다.', () => {
    expect(isHangulAlphanumeric('안녕하세요')).toBeTruthy();
    expect(isHangulAlphanumeric('Hello')).toBeTruthy();
    expect(isHangulAlphanumeric('안녕하세요123')).toBeTruthy();
    expect(isHangulAlphanumeric('Hello123')).toBeTruthy();
    expect(isHangulAlphanumeric('123')).toBeTruthy();
  });

  it('문자열이 한글 또는 알파벳 또는 숫자로 이루어져 있지 않으면 false를 반환해야 합니다.', () => {
    expect(isHangulAlphanumeric('!@#')).toBeFalsy();
    expect(isHangulAlphanumeric('')).toBeFalsy();
  });
});
