import { describe, it, expect } from 'vitest';
import { containsSpecialCharacters } from '.';

describe('containsSpecialCharacter', () => {
  it('특수문자가 포함된 문자열이면 true를 반환해야 합니다', () => {
    expect(containsSpecialCharacters('hello!')).toBeTruthy();
    expect(containsSpecialCharacters('@home')).toBeTruthy();
    expect(containsSpecialCharacters('123$')).toBeTruthy();
    expect(containsSpecialCharacters('abc#def')).toBeTruthy();
    expect(containsSpecialCharacters('special_characters%')).toBeTruthy();
  });

  it('특수문자가 포함되지 않은 문자열이면 false를 반환해야 합니다', () => {
    expect(containsSpecialCharacters('')).toBeFalsy();
    expect(containsSpecialCharacters('hello')).toBeFalsy();
    expect(containsSpecialCharacters('12345')).toBeFalsy();
    expect(containsSpecialCharacters('abcDEF')).toBeFalsy();
  });
});
