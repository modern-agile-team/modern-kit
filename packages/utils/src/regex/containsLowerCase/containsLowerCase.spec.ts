import { containsLowerCase } from '.';

describe('containsLowerCase', () => {
  it('should return true for a string containing lower case letters', () => {
    expect(containsLowerCase('hello')).toBeTruthy();
    expect(containsLowerCase('Hello')).toBeTruthy();
    expect(containsLowerCase('123abc')).toBeTruthy();
    expect(containsLowerCase('ABCdef')).toBeTruthy();
  });

  it('should return false for a string without lower case letters', () => {
    expect(containsLowerCase('')).toBeFalsy();
    expect(containsLowerCase('HELLO')).toBeFalsy();
    expect(containsLowerCase('12345')).toBeFalsy();
    expect(containsLowerCase('!@#$%')).toBeFalsy();
  });
});
