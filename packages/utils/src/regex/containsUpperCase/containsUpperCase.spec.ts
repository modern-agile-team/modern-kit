import { containsUpperCase } from '.';

describe.concurrent('containsUpperCase', () => {
  it('should return true for a string containing upper case letters', () => {
    expect(containsUpperCase('HELLO')).toBeTruthy();
    expect(containsUpperCase('Hello')).toBeTruthy();
    expect(containsUpperCase('ABCdef')).toBeTruthy();
    expect(containsUpperCase('123ABC')).toBeTruthy();
  });

  it('should return false for a string without upper case letters', () => {
    expect(containsUpperCase('')).toBeFalsy();
    expect(containsUpperCase('hello')).toBeFalsy();
    expect(containsUpperCase('12345')).toBeFalsy();
    expect(containsUpperCase('!@#$%')).toBeFalsy();
  });
});
