import { describe, it, expect } from 'vitest';
import { countSubstringOccurrences } from '.';

describe('countSubstringOccurrences', () => {
  it('should return 0 if the target word passed in as an argument does not occur', () => {
    const str1 = 'apple banana apple grapes apple';
    expect(countSubstringOccurrences(str1, 'orange')).toBe(0);
  });

  it('should return the number of occurrences of the target word passed in as an argument', () => {
    const str1 = 'apple banana apple grapes apple';
    expect(countSubstringOccurrences(str1, 'apple')).toBe(3);
    expect(countSubstringOccurrences(str1, 'apple banana')).toBe(1);

    const str2 =
      '테스트용 문자열입니다. 테스트용 문자열이니 너무 의미를 두지 마세요. 테스트테스트';
    expect(countSubstringOccurrences(str2, '테스트')).toBe(4);
    expect(countSubstringOccurrences(str2, '테스트용 문자열')).toBe(2);
  });

  it('should return 0 when either source or target is an empty string', () => {
    expect(countSubstringOccurrences('', 'abc')).toBe(0);
    expect(countSubstringOccurrences('abc', '')).toBe(0);
  });

  it('should return the correct count of occurrences', () => {
    expect(countSubstringOccurrences('abc', 'abc')).toBe(1);
    expect(countSubstringOccurrences('aaaa', 'aa', { overlap: true })).toBe(3);
    expect(countSubstringOccurrences('banana', 'na')).toBe(2);
  });

  it('should handle special characters in the target string', () => {
    expect(countSubstringOccurrences('a.b.c', '.')).toBe(2);
    expect(countSubstringOccurrences('a(b)c(d)e', '(')).toBe(2);
  });
});
