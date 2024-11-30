import { describe, expect, it } from 'vitest';
import { clamp } from '.';

describe('clamp', () => {
  it('works with max', () => {
    expect(clamp(3, 5)).toBe(3);
    expect(clamp(10, 6)).toBe(6);
  });

  it('works with min and max', () => {
    expect(clamp(7, 0, 10)).toBe(7);
    expect(clamp(10, 0, 5)).toBe(5);
    expect(clamp(-5, 0, 10)).toBe(0);
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
    expect(clamp(5, 5, 5)).toBe(5);
  });
});
