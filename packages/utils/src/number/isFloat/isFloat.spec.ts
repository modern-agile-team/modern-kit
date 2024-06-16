import { describe } from 'vitest';
import { isFloat } from '.';

describe('isFloat', () => {
  it('should return true if value is float', () => {
    expect(isFloat(100)).toBe(true);
    expect(isFloat(0)).toBe(true);
    expect(isFloat(0.5)).toBe(true);
    expect(isFloat(-0.5)).toBe(true);
    expect(isFloat(1.999989899)).toBe(true);
    expect(isFloat(-1.50010101011)).toBe(true);
    expect(isFloat(1e3)).toBe(true);
    expect(isFloat(2.5e-3)).toBe(true);
  });

  it('should return false if value is not a number', () => {
    expect(isFloat('')).toBe(false);
    expect(isFloat(null)).toBe(false);
    expect(isFloat(undefined)).toBe(false);
    expect(isFloat(false)).toBe(false);
    expect(isFloat(NaN)).toBe(false);
    expect(isFloat(Infinity)).toBe(false);
    expect(isFloat(-Infinity)).toBe(false);
    expect(isFloat([])).toBe(false);
    expect(isFloat({})).toBe(false);
  });
});
