import { containsWhiteSpace } from '.';

describe.concurrent('containsWhiteSpace', () => {
  it('should return true for a string containing whitespace characters', () => {
    expect(containsWhiteSpace('hello world')).toBe(true);
    expect(containsWhiteSpace(' leading')).toBe(true);
    expect(containsWhiteSpace('trailing ')).toBe(true);
    expect(containsWhiteSpace('multiple spaces')).toBe(true);
    expect(containsWhiteSpace('\t')).toBe(true); // Tab character
    expect(containsWhiteSpace('\n')).toBe(true); // Newline character
  });

  it('should return false for a string without whitespace characters', () => {
    expect(containsWhiteSpace('')).toBe(false);
    expect(containsWhiteSpace('helloworld')).toBe(false);
    expect(containsWhiteSpace('12345')).toBe(false);
    expect(containsWhiteSpace('!@#$%')).toBe(false);
  });
});
