import { describe, it, expect } from 'vitest';
import { containsHangul } from '.';

describe('containsHangul', () => {
  it('한글 문자가 포함된 문자열이면 true를 반환해야 합니다', () => {
    expect(containsHangul('안녕하세요')).toBeTruthy();
    expect(containsHangul('hello안!@#')).toBeTruthy();
    expect(containsHangul('123ㅂ')).toBeTruthy(); // 자음
    expect(containsHangul('123ㅏ')).toBeTruthy(); // 모음
  });

  it('한글 문자가 포함되지 않은 문자열이면 false를 반환해야 합니다', () => {
    expect(containsHangul('')).toBeFalsy();
    expect(containsHangul('hello')).toBeFalsy();
    expect(containsHangul('12345')).toBeFalsy();
    expect(containsHangul('!@#$%')).toBeFalsy();
  });
});
