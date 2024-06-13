import { containsWhitespace } from '.';

describe('containsWhitespace', () => {
  it('should return true for a string containing whitespace characters', () => {
    expect(containsWhitespace('hello world')).toBe(true);
    expect(containsWhitespace(' leading')).toBe(true);
    expect(containsWhitespace('trailing ')).toBe(true);
    expect(containsWhitespace('multiple spaces')).toBe(true);
    expect(containsWhitespace('\t')).toBe(true); // Tab character
    expect(containsWhitespace('\n')).toBe(true); // Newline character
  });

  it('should return false for a string without whitespace characters', () => {
    expect(containsWhitespace('')).toBe(false);
    expect(containsWhitespace('helloworld')).toBe(false);
    expect(containsWhitespace('12345')).toBe(false);
    expect(containsWhitespace('!@#$%')).toBe(false);
  });
});
