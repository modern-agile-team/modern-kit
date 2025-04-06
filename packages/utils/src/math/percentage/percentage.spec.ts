import { describe, it, expect } from 'vitest';
import { percentage } from '.';

describe('percentage', () => {
  it('정상적인 값에 대해 올바른 백분율을 계산한다', () => {
    expect(percentage(50, 100)).toBe(50);
    expect(percentage(25, 100)).toBe(25);
    expect(percentage(75, 100)).toBe(75);
  });

  it('소수점이 있는 결과를 올바르게 반올림한다', () => {
    expect(percentage(33, 100)).toBe(33);
    expect(percentage(66.666, 100)).toBe(66.67);
    expect(percentage(33.333, 100)).toBe(33.33);
  });

  it('total이 0이거나 음수일 경우 0을 반환한다', () => {
    expect(percentage(50, 0)).toBe(0);
    expect(percentage(50, -100)).toBe(0);
  });

  it('value가 total보다 큰 경우도 올바르게 계산한다', () => {
    expect(percentage(150, 100)).toBe(150);
    expect(percentage(200, 100)).toBe(200);
  });
});
