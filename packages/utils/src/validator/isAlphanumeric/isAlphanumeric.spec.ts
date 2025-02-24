import { describe, expect, it } from 'vitest';
import { isAlphanumeric } from '.';

describe('isAlphanumeric', () => {
  it('문자만 포함된 문자열에 대해 true를 반환해야 합니다', () => {
    expect(isAlphanumeric('abc')).toBeTruthy();
    expect(isAlphanumeric('ABC')).toBeTruthy();
  });

  it('숫자만 포함된 문자열에 대해 true를 반환해야 합니다', () => {
    expect(isAlphanumeric('123')).toBeTruthy();
  });

  it('알파벳과 숫자로만 이루어진 문자열에 대해 true를 반환해야 합니다', () => {
    expect(isAlphanumeric('abc123')).toBeTruthy();
    expect(isAlphanumeric('ABC123')).toBeTruthy();
    expect(isAlphanumeric('a1b2c3')).toBeTruthy();
  });

  it('알파벳과 숫자가 아닌 문자가 포함된 문자열에 대해 false를 반환해야 합니다', () => {
    expect(isAlphanumeric('abc123!')).toBeFalsy();
    expect(isAlphanumeric('한글')).toBeFalsy();
    expect(isAlphanumeric('😂')).toBeFalsy();
  });

  it('공백이 포함된 문자열에 대해 false를 반환해야 합니다', () => {
    expect(isAlphanumeric('abc 123')).toBeFalsy();
  });

  it('빈 문자열에 대해 false를 반환해야 합니다', () => {
    expect(isAlphanumeric('')).toBeFalsy();
  });
});
