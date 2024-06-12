import { isPassword } from '.';

describe('isPassword', () => {
  it('should return true for a valid password with default options', () => {
    // truthy case
    expect(isPassword('Password@1')).toBeTruthy();

    // falsy case
    expect(isPassword('pass')).toBeFalsy();
    expect(isPassword('password123456789')).toBeFalsy();
    expect(isPassword('password한글')).toBeFalsy();
    expect(isPassword(' password ')).toBeFalsy();
  });

  it('should check password length against custom minLength and maxLength', () => {
    // truthy case
    expect(
      isPassword('Password@1234', { minLength: 8, maxLength: 16 })
    ).toBeTruthy();

    // falsy case
    expect(isPassword('pass', { minLength: 8, maxLength: 16 })).toBeFalsy();
    expect(
      isPassword('password123456789', { minLength: 8, maxLength: 16 })
    ).toBeFalsy();
  });

  it('should validate the password based on the specified level', () => {
    expect(isPassword('1234', { level: 0 })).toBeTruthy();

    // level1: Check password minimum/maximum length
    expect(isPassword('12345678', { level: 1 })).toBeTruthy();
    expect(isPassword('1234', { level: 1 })).toBeFalsy();

    // level2: Check for inclusion of lowercase letter
    expect(isPassword('password', { level: 2 })).toBeTruthy();
    expect(isPassword('12345678', { level: 2 })).toBeFalsy();

    // level3: Check for inclusion of lowercase letter + numbers
    expect(isPassword('password1', { level: 3 })).toBeTruthy();
    expect(isPassword('password', { level: 3 })).toBeFalsy();

    // level4: Check for inclusion of lowercase letter + numbers + special characters
    expect(isPassword('password@1', { level: 4 })).toBeTruthy();
    expect(isPassword('password1', { level: 4 })).toBeFalsy();

    // level5: Check for inclusion of lowercase letter + numbers + special characters + uppercase letter
    expect(isPassword('Password@1', { level: 5 })).toBeTruthy();
    expect(isPassword('password@1', { level: 5 })).toBeFalsy();
  });

  it('should allow Korean characters in the password if specified', () => {
    expect(
      isPassword('Password@1234한글', { isContainHangul: true })
    ).toBeTruthy();
  });

  it('should return false for passwords in the forbidden list', () => {
    const forbiddenPasswords = ['12345678', 'admin', 'password'] as const;

    forbiddenPasswords.forEach((password) => {
      expect(isPassword(password, { forbiddenPasswords })).toBeFalsy();
    });
  });

  it('should return false for a password with repeated characters exceeding the limit', () => {
    expect(isPassword('Password@1', { maxRepeatChars: 3 })).toBeTruthy();
    expect(isPassword('PPPassword@1', { maxRepeatChars: 3 })).toBeFalsy();
  });

  it('should throw an error for invalid length values', () => {
    expect(() =>
      isPassword('Password@1234', { minLength: NaN })
    ).toThrowError();

    expect(() => isPassword('Password@1234', { minLength: -1 })).toThrowError();

    expect(() =>
      isPassword('Password@1234', { minLength: 1.1 })
    ).toThrowError();

    expect(() =>
      isPassword('Password@1234', { maxLength: Infinity })
    ).toThrowError();

    expect(() =>
      isPassword('Password@1234', { maxRepeatChars: NaN })
    ).toThrowError();
  });
});
