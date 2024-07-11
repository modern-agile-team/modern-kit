import { containsHangulSyllables } from '.';

describe.concurrent('containsHangulSyllables', () => {
  it('should return true for a string containing Hangul syllables', () => {
    expect(containsHangulSyllables('안녕하세요')).toBeTruthy();
    expect(containsHangulSyllables('hello안녕하세요')).toBeTruthy();
    expect(containsHangulSyllables('123안녕456')).toBeTruthy();
    expect(containsHangulSyllables('가나다')).toBeTruthy();
  });

  it('should return false for a string without Hangul syllables', () => {
    expect(containsHangulSyllables('')).toBeFalsy();
    expect(containsHangulSyllables('hello')).toBeFalsy();
    expect(containsHangulSyllables('12345')).toBeFalsy();
    expect(containsHangulSyllables('!@#$%')).toBeFalsy();
    expect(containsHangulSyllables('ㄱㅏㄴ')).toBeFalsy(); // Only consonants and vowels
  });
});
