import { rem } from '.';

describe('rem', () => {
  it('should calculate "rem" based on 16px', () => {
    expect(rem(16)).toBe('1rem');
    expect(rem(18)).toBe('1.125rem');
    expect(rem(14)).toBe('0.875rem');
  });
});
