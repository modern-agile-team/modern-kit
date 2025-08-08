import { describe, it, expect } from 'vitest';
import { containsLowerCase } from '.';

describe('containsLowerCase', () => {
  it('소문자가 포함된 문자열이면 true를 반환해야 합니다', () => {
    expect(containsLowerCase('hello')).toBeTruthy();
    expect(containsLowerCase('Hello')).toBeTruthy();
    expect(containsLowerCase('123abc')).toBeTruthy();
    expect(containsLowerCase('ABCdef')).toBeTruthy();
  });

  it('소문자가 포함되지 않은 문자열이면 false를 반환해야 합니다', () => {
    expect(containsLowerCase('')).toBeFalsy();
    expect(containsLowerCase('HELLO')).toBeFalsy();
    expect(containsLowerCase('12345')).toBeFalsy();
    expect(containsLowerCase('!@#$%')).toBeFalsy();
  });
});
