import { describe, it, expect } from 'vitest';
import { formatSizeStyleValue } from '.';

describe('formatSizeStyleValue', () => {
  it('should return the value with the default suffix "px" if the suffix is not provided', () => {
    expect(formatSizeStyleValue(10)).toBe('10px');
  });

  it('should return the value with the suffix if the suffix is provided.', () => {
    expect(formatSizeStyleValue(10, '%')).toBe('10%');
  });
});
