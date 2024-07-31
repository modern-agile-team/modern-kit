import { describe, it, expect } from 'vitest';
import { formatNumberWithCommas } from '.';

describe('formatNumberWithCommas', () => {
  it('should return a string with a comma after every thousand digits when entering a number', () => {
    expect(formatNumberWithCommas(200)).toBe('200');
    expect(formatNumberWithCommas(3000)).toBe('3,000');
    expect(formatNumberWithCommas(50000)).toBe('50,000');
    expect(formatNumberWithCommas(123123123)).toBe('123,123,123');
  });

  it('should return numbers with commas after every three digits when input is a string', () => {
    expect(formatNumberWithCommas('200')).toBe('200');
    expect(formatNumberWithCommas('3000')).toBe('3,000');
    expect(formatNumberWithCommas('50000')).toBe('50,000');
    expect(formatNumberWithCommas('123123123')).toBe('123,123,123');
    expect(formatNumberWithCommas('price: 500000')).toBe('price: 500,000');
  });
});
