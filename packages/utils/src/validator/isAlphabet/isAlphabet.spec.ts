import { describe, expect, it } from 'vitest';
import { isAlphabet } from '.';

describe('isAlphabet', () => {
  it('문자열이 알파벳으로 이루어져 있으면 true를 반환해야 합니다.', () => {
    expect(isAlphabet('Hello')).toBeTruthy();
  });

  it('문자열이 알파벳으로 이루어져 있지 않으면 false를 반환해야 합니다.', () => {
    expect(isAlphabet('안녕하세요')).toBeFalsy();
    expect(isAlphabet('123')).toBeFalsy();
    expect(isAlphabet('!@#')).toBeFalsy();
    expect(isAlphabet('')).toBeFalsy();
  });
});
