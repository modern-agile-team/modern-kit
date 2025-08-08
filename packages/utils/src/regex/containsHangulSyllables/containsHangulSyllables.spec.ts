import { describe, it, expect } from 'vitest';
import { containsHangulSyllables } from '.';

describe('containsHangulSyllables', () => {
  it('한글 음절이 포함된 문자열이면 true를 반환해야 합니다', () => {
    expect(containsHangulSyllables('안녕하세요')).toBeTruthy();
    expect(containsHangulSyllables('hello안녕하세요')).toBeTruthy();
    expect(containsHangulSyllables('123안녕456')).toBeTruthy();
    expect(containsHangulSyllables('가나다')).toBeTruthy();
  });

  it('한글 음절이 포함되지 않은 문자열이면 false를 반환해야 합니다', () => {
    expect(containsHangulSyllables('')).toBeFalsy();
    expect(containsHangulSyllables('hello')).toBeFalsy();
    expect(containsHangulSyllables('12345')).toBeFalsy();
    expect(containsHangulSyllables('!@#$%')).toBeFalsy();
    expect(containsHangulSyllables('ㄱㅏㄴ')).toBeFalsy(); // 자음과 모음만 있는 경우
  });
});
