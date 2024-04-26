import { extractNumber } from '.';

describe('extractNumber', () => {
  it('should return a string with all non-numeric characters removed', () => {
    expect(extractNumber('abc123sd45')).toBe('12345');
    expect(extractNumber('1 23 sd 4 5')).toBe('12345');

    expect(extractNumber('🥲')).toBe('');
    expect(extractNumber('   ')).toBe('');
  });
});
