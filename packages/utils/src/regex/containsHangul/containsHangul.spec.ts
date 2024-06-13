import { containsHangul } from '.';

describe('containsHangul', () => {
  it('should return true for a string containing Hangul characters', () => {
    expect(containsHangul('안녕하세요')).toBeTruthy();
    expect(containsHangul('hello안!@#')).toBeTruthy();
    expect(containsHangul('123ㅂ')).toBeTruthy(); // 자음
    expect(containsHangul('123ㅏ')).toBeTruthy(); // 모음
  });

  it('should return false for a string without Hangul characters', () => {
    expect(containsHangul('')).toBeFalsy();
    expect(containsHangul('hello')).toBeFalsy();
    expect(containsHangul('12345')).toBeFalsy();
    expect(containsHangul('!@#$%')).toBeFalsy();
  });
});
