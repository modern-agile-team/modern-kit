import { describe, it, expect } from 'vitest';
import { containsNumber } from '.';

describe('containsNumber', () => {
  it('should return true for a string containing numbers', () => {
    expect(containsNumber('123')).toBeTruthy();
    expect(containsNumber('abc123')).toBeTruthy();
    expect(containsNumber('123@abc')).toBeTruthy();
  });

  it('should return false for a string without numbers', () => {
    expect(containsNumber('')).toBeFalsy();
    expect(containsNumber('hello')).toBeFalsy();
    expect(containsNumber('HELLO')).toBeFalsy();
    expect(containsNumber('!@#$%')).toBeFalsy();
  });
});
