import { isValidPassword } from '.';

describe('isValidPassword', () => {
  it('should return true for a valid password with default options', () => {
    // truthy case
    expect(isValidPassword('password')).toBeTruthy();

    // falsy case
    expect(isValidPassword('passwo')).toBeFalsy(); // minLength
    expect(isValidPassword('password123456789')).toBeFalsy(); // maxLength
    expect(isValidPassword('password한글')).toBeFalsy(); // hangul
    expect(isValidPassword(' password ')).toBeFalsy(); // whitespace
  });

  it('should check password length against custom minLength and maxLength', () => {
    // truthy case
    expect(
      isValidPassword('Password@1', { minLength: 8, maxLength: 12 })
    ).toBeTruthy();

    // falsy case
    expect(
      isValidPassword('Pass@1', { minLength: 8, maxLength: 12 })
    ).toBeFalsy();
    expect(
      isValidPassword('Password@1234', { minLength: 8, maxLength: 12 })
    ).toBeFalsy();
  });

  it('should validate the password based on the validator array', () => {
    // Check password minimum/maximum length
    expect(isValidPassword('12345678')).toBeTruthy();
    expect(isValidPassword('1234')).toBeFalsy();

    // Check for inclusion of lowercase letter
    expect(
      isValidPassword('password', { validator: ['lowerCase'] })
    ).toBeTruthy();
    expect(
      isValidPassword('12345678', { validator: ['lowerCase'] })
    ).toBeFalsy();

    // Check for inclusion of lowercase letter + numbers
    expect(
      isValidPassword('password1', { validator: ['lowerCase', 'number'] })
    ).toBeTruthy();
    expect(
      isValidPassword('password', { validator: ['lowerCase', 'number'] })
    ).toBeFalsy();

    // Check for inclusion of lowercase letter + numbers + special characters
    expect(
      isValidPassword('password@1', {
        validator: ['lowerCase', 'number', 'specialCharacter'],
      })
    ).toBeTruthy();
    expect(
      isValidPassword('password1', {
        validator: ['lowerCase', 'number', 'specialCharacter'],
      })
    ).toBeFalsy();

    // Check for inclusion of lowercase letter + numbers + special characters + uppercase letter
    expect(
      isValidPassword('Password@1', {
        validator: ['lowerCase', 'number', 'specialCharacter', 'upperCase'],
      })
    ).toBeTruthy();
    expect(
      isValidPassword('password@1', {
        validator: ['lowerCase', 'number', 'specialCharacter', 'upperCase'],
      })
    ).toBeFalsy();
  });

  it('should allow Korean characters in the password if specified', () => {
    expect(
      isValidPassword('password안ㅇㄱㅎ', { isContainHangul: true })
    ).toBeTruthy();
  });

  it('should return false for passwords in the forbidden list', () => {
    const forbiddenPasswords = ['12345678', 'admin', 'password'] as const;

    forbiddenPasswords.forEach((password) => {
      expect(isValidPassword(password, { forbiddenPasswords })).toBeFalsy();
    });
  });

  it('should return false for a password with repeated characters exceeding the limit', () => {
    expect(isValidPassword('Password@1', { maxRepeatChars: 3 })).toBeTruthy();

    expect(isValidPassword('PPPassword@1', { maxRepeatChars: 3 })).toBeFalsy();
    expect(isValidPassword('P한한한s@1', { maxRepeatChars: 3 })).toBeFalsy();
  });

  it('should throw an error for invalid length values', () => {
    expect(() =>
      isValidPassword('Password@1234', { minLength: NaN })
    ).toThrowError();

    expect(() =>
      isValidPassword('Password@1234', { minLength: -1 })
    ).toThrowError();

    expect(() =>
      isValidPassword('Password@1234', { minLength: 1.1 })
    ).toThrowError();

    expect(() =>
      isValidPassword('Password@1234', { maxLength: Infinity })
    ).toThrowError();

    expect(() =>
      isValidPassword('Password@1234', { maxRepeatChars: NaN })
    ).toThrowError();
  });
});
