import { containsHangulConsonantsAndVowel } from '.';

describe('containsHangulConsonantsAndVowel', () => {
  it('should return true for a string containing Hangul consonants and vowels', () => {
    expect(containsHangulConsonantsAndVowel('ㄱ')).toBe(true);
    expect(containsHangulConsonantsAndVowel('ㅏ')).toBe(true);
    expect(containsHangulConsonantsAndVowel('ㄱㅏ')).toBe(true);
    expect(containsHangulConsonantsAndVowel('helloㄱ')).toBe(true);
    expect(containsHangulConsonantsAndVowel('helloㅏ')).toBe(true);
  });

  it('should return false for a string without Hangul consonants or vowels', () => {
    expect(containsHangulConsonantsAndVowel('')).toBe(false);
    expect(containsHangulConsonantsAndVowel('hello')).toBe(false);
    expect(containsHangulConsonantsAndVowel('12345')).toBe(false);
    expect(containsHangulConsonantsAndVowel('!@#$%')).toBe(false);
  });
});
