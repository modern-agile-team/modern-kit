import { describe, it, expect } from 'vitest';
import { containsNumber } from '.';

describe('containsNumber', () => {
  it('숫자가 포함된 문자열이면 true를 반환해야 합니다', () => {
    expect(containsNumber('123')).toBeTruthy();
    expect(containsNumber('abc123')).toBeTruthy();
    expect(containsNumber('123@abc')).toBeTruthy();
  });

  it('숫자가 포함되지 않은 문자열이면 false를 반환해야 합니다', () => {
    expect(containsNumber('')).toBeFalsy();
    expect(containsNumber('hello')).toBeFalsy();
    expect(containsNumber('HELLO')).toBeFalsy();
    expect(containsNumber('!@#$%')).toBeFalsy();
  });
});
