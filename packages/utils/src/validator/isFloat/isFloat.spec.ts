import { describe, it, expect } from 'vitest';
import { isFloat } from '.';

describe('isFloat', () => {
  it('부동 소수점 값인 경우 true를 반환해야 합니다.', () => {
    expect(isFloat(0.5)).toBe(true);
    expect(isFloat(-0.5)).toBe(true);
    expect(isFloat(1.999989899)).toBe(true);
    expect(isFloat(-1.50010101011)).toBe(true);
  });

  it('정수인 경우 false를 반환해야 합니다.', () => {
    expect(isFloat(0)).toBe(false);
    expect(isFloat(-1)).toBe(false);
    expect(isFloat(1)).toBe(false);
    expect(isFloat(100)).toBe(false);
  });

  it('숫자가 아닌 경우 false를 반환해야 합니다.', () => {
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
