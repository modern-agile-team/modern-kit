import { describe, it, expect } from 'vitest';
import { formatSizeStyleValue } from '.';

describe('formatSizeStyleValue', () => {
  it('should return the value with the default suffix "px" if the value type is a number', () => {
    expect(formatSizeStyleValue(10)).toBe('10px');
  });

  it('should return the value with the suffix if the suffix is provided.', () => {
    expect(formatSizeStyleValue(10, '%')).toBe('10%');
  });
});
