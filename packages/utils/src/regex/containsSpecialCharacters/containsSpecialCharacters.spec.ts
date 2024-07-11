import { containsSpecialCharacters } from '.';

describe.concurrent('containsSpecialCharacter', () => {
  it('should return true for a string containing special characters', () => {
    expect(containsSpecialCharacters('hello!')).toBeTruthy();
    expect(containsSpecialCharacters('@home')).toBeTruthy();
    expect(containsSpecialCharacters('123$')).toBeTruthy();
    expect(containsSpecialCharacters('abc#def')).toBeTruthy();
    expect(containsSpecialCharacters('special_characters%')).toBeTruthy();
  });

  it('should return false for a string without special characters', () => {
    expect(containsSpecialCharacters('')).toBeFalsy();
    expect(containsSpecialCharacters('hello')).toBeFalsy();
    expect(containsSpecialCharacters('12345')).toBeFalsy();
    expect(containsSpecialCharacters('abcDEF')).toBeFalsy();
  });
});
