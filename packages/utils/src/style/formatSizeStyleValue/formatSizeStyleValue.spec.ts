import { describe, it, expect } from 'vitest';
import { formatSizeStyleValue } from '.';

describe('formatSizeStyleValue', () => {
  it('접미사를 제공하지 않으면 기본 접미사 "px"와 함께 값을 반환해야 한다', () => {
    expect(formatSizeStyleValue(10)).toBe('10px');
  });

  it('접미사를 제공하면 해당 접미사와 함께 값을 반환해야 한다', () => {
    expect(formatSizeStyleValue(10, '%')).toBe('10%');
  });
});
