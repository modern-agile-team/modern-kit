import { describe, it, expect } from 'vitest';
import { containsHangulConsonantsAndVowel } from '.';

describe('containsHangulConsonantsAndVowel', () => {
  it('한글 자음과 모음이 포함된 문자열이면 true를 반환해야 합니다', () => {
    expect(containsHangulConsonantsAndVowel('ㄱ')).toBe(true);
    expect(containsHangulConsonantsAndVowel('ㅏ')).toBe(true);
    expect(containsHangulConsonantsAndVowel('ㄱㅏ')).toBe(true);
    expect(containsHangulConsonantsAndVowel('helloㄱ')).toBe(true);
    expect(containsHangulConsonantsAndVowel('helloㅏ')).toBe(true);
  });

  it('한글 자음과 모음이 포함되지 않은 문자열이면 false를 반환해야 합니다', () => {
    expect(containsHangulConsonantsAndVowel('')).toBe(false);
    expect(containsHangulConsonantsAndVowel('hello')).toBe(false);
    expect(containsHangulConsonantsAndVowel('12345')).toBe(false);
    expect(containsHangulConsonantsAndVowel('!@#$%')).toBe(false);
  });
});
