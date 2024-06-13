import { containsSpecialCharacter } from '.';

describe('containsSpecialCharacter', () => {
  it('should return true for a string containing special characters', () => {
    expect(containsSpecialCharacter('hello!')).toBeTruthy();
    expect(containsSpecialCharacter('@home')).toBeTruthy();
    expect(containsSpecialCharacter('123$')).toBeTruthy();
    expect(containsSpecialCharacter('abc#def')).toBeTruthy();
    expect(containsSpecialCharacter('special_characters%')).toBeTruthy();
  });

  it('should return false for a string without special characters', () => {
    expect(containsSpecialCharacter('')).toBeFalsy();
    expect(containsSpecialCharacter('hello')).toBeFalsy();
    expect(containsSpecialCharacter('12345')).toBeFalsy();
    expect(containsSpecialCharacter('abcDEF')).toBeFalsy();
  });
});
