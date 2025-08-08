import { describe, it, expect } from 'vitest';
import { containsUpperCase } from '.';

describe('containsUpperCase', () => {
  it('대문자가 포함된 문자열이면 true를 반환해야 합니다', () => {
    expect(containsUpperCase('HELLO')).toBeTruthy();
    expect(containsUpperCase('Hello')).toBeTruthy();
    expect(containsUpperCase('ABCdef')).toBeTruthy();
    expect(containsUpperCase('123ABC')).toBeTruthy();
  });

  it('대문자가 포함되지 않은 문자열이면 false를 반환해야 합니다', () => {
    expect(containsUpperCase('')).toBeFalsy();
    expect(containsUpperCase('hello')).toBeFalsy();
    expect(containsUpperCase('12345')).toBeFalsy();
    expect(containsUpperCase('!@#$%')).toBeFalsy();
  });
});
