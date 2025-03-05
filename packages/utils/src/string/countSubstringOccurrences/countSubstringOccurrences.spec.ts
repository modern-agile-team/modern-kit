import { describe, it, expect } from 'vitest';
import { countSubstringOccurrences } from '.';

describe('countSubstringOccurrences', () => {
  it('인자로 전달된 대상 문자열이 존재하지 않으면 0을 반환해야 합니다.', () => {
    const str1 = 'apple banana apple grapes apple';
    expect(countSubstringOccurrences(str1, 'orange')).toBe(0);
  });

  it('인자로 전달된 대상 문자열의 등장 횟수를 반환해야 합니다.', () => {
    const str1 = 'apple banana apple grapes apple';
    expect(countSubstringOccurrences(str1, 'apple')).toBe(3);
    expect(countSubstringOccurrences(str1, 'apple banana')).toBe(1);

    const str2 =
      '테스트용 문자열입니다. 테스트용 문자열이니 너무 의미를 두지 마세요. 테스트테스트';
    expect(countSubstringOccurrences(str2, '테스트')).toBe(4);
    expect(countSubstringOccurrences(str2, '테스트용 문자열')).toBe(2);
  });

  it('원본 문자열이나 대상 문자열이 빈 문자열일 경우 0을 반환해야 합니다.', () => {
    expect(countSubstringOccurrences('', 'abc')).toBe(0);
    expect(countSubstringOccurrences('abc', '')).toBe(0);
  });

  it('문자열 등장 횟수를 overlap 옵션에 따라 정확하게 반환해야 합니다.', () => {
    expect(countSubstringOccurrences('aaaa', 'aa', { overlap: true })).toBe(3);
    expect(countSubstringOccurrences('aaaa', 'aa', { overlap: false })).toBe(2);
  });

  it('대상 문자열의 특수 문자를 올바르게 처리해야 합니다.', () => {
    expect(countSubstringOccurrences('a.b.c', '.')).toBe(2);
    expect(countSubstringOccurrences('a(b)c(d)e', '(')).toBe(2);
  });
});
