import { describe, expect, it } from 'vitest';
import { isNumericString } from '.';

describe('isNumericString', () => {
  it('should return true if the arugment is numeric string', () => {
    expect(isNumericString('123')).toBeTruthy();
    expect(isNumericString('0')).toBeTruthy();
  });

  it('should return false if the arugment is not numeric string', () => {
    expect(isNumericString('-123')).toBeFalsy();
    expect(isNumericString('1a')).toBeFalsy();
    expect(isNumericString('1@')).toBeFalsy();
    expect(isNumericString('1[]')).toBeFalsy();
    expect(isNumericString('12.00')).toBeFalsy();
  });

  it('should validate numeric strings correctly, allowing signs when sign option is enabled', () => {
    expect(isNumericString('123.45', { sign: true })).toBeTruthy();
    expect(isNumericString('-123.45', { sign: true })).toBeTruthy();

    expect(isNumericString('12.3a45', { sign: true })).toBeFalsy();
    expect(isNumericString('12-345', { sign: true })).toBeFalsy();
    expect(isNumericString('123.', { sign: true })).toBeFalsy();
  });
});
