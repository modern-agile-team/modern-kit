import { describe, expect, it } from 'vitest';
import { clamp } from '.';

describe('clamp', () => {
  it('min과 max 사이에 있을 경우 value를 그대로 반환해야 됩니다.', () => {
    expect(clamp(3, 5)).toBe(3);
    expect(clamp(3, 0, 5)).toBe(3);
    expect(clamp(5, 5, 5)).toBe(5);
  });

  it('max만 있을 경우 최댓값으로 제한해야 됩니다.', () => {
    expect(clamp(10, 6)).toBe(6);
  });

  it('min, max가 있을 경우 최솟값과 최댓값 사이로 제한해야 됩니다.', () => {
    expect(clamp(-5, 0, 10)).toBe(0); // 최솟값으로 제한
    expect(clamp(15, 0, 10)).toBe(10); // 최댓값으로 제한
  });
});
