import { isValidPassword } from '.';

const truthyResult = {
  isValid: true,
  errorReason: null,
};

const falsyResult = (errorReason: string) => ({
  isValid: false,
  errorReason,
});

describe.concurrent('isValidPassword', () => {
  it('should return true for a valid password with default options', () => {
    // truthy case
    expect(isValidPassword('password')).toEqual(truthyResult);

    // falsy case
    expect(isValidPassword('passwo')).toEqual(falsyResult('length'));
    expect(isValidPassword('passwordpassword123456789')).toEqual(
      falsyResult('length')
    );

    expect(isValidPassword('password한글')).toEqual(falsyResult('hangul'));
    expect(isValidPassword(' password ')).toEqual(falsyResult('whiteSpace'));
  });

  it('should check password length against custom minLength and maxLength', () => {
    // truthy case
    expect(
      isValidPassword('Password@1', { minLength: 8, maxLength: 12 })
    ).toEqual(truthyResult);

    // falsy case
    expect(isValidPassword('Pass@1', { minLength: 8, maxLength: 12 })).toEqual(
      falsyResult('length')
    );
    expect(
      isValidPassword('Password@1234', { minLength: 8, maxLength: 12 })
    ).toEqual(falsyResult('length'));
  });

  it('should validate the password based on the containsOptions', () => {
    // Check password minimum/maximum length
    expect(isValidPassword('12345678')).toEqual(truthyResult);
    expect(isValidPassword('1234')).toEqual(falsyResult('length'));

    // Check for inclusion of lowercase letter
    expect(
      isValidPassword('password', { containsOptions: { lowerCase: true } })
    ).toEqual(truthyResult);
    expect(
      isValidPassword('12345678', { containsOptions: { lowerCase: true } })
    ).toEqual(falsyResult('lowerCase'));

    // Check for inclusion of lowercase letter + numbers
    expect(
      isValidPassword('password1', {
        containsOptions: { lowerCase: true, number: true },
      })
    ).toEqual(truthyResult);
    expect(
      isValidPassword('password', {
        containsOptions: { lowerCase: true, number: true },
      })
    ).toEqual(falsyResult('number'));

    // Check for inclusion of lowercase letter + numbers + special characters
    expect(
      isValidPassword('password@1', {
        containsOptions: {
          lowerCase: true,
          number: true,
          specialCharacters: true,
        },
      })
    ).toEqual(truthyResult);
    expect(
      isValidPassword('password1', {
        containsOptions: {
          lowerCase: true,
          number: true,
          specialCharacters: true,
        },
      })
    ).toEqual(falsyResult('specialCharacters'));

    // Check for inclusion of lowercase letter + numbers + special characters + uppercase letter
    expect(
      isValidPassword('Password@1', {
        containsOptions: {
          lowerCase: true,
          number: true,
          specialCharacters: true,
          upperCase: true,
        },
      })
    ).toEqual(truthyResult);
    expect(
      isValidPassword('password@1', {
        containsOptions: {
          lowerCase: true,
          number: true,
          specialCharacters: true,
          upperCase: true,
        },
      })
    ).toEqual(falsyResult('upperCase'));
  });

  it('should return false for passwords in the forbidden list', () => {
    const forbiddenPasswords = ['12345678', 'admin', 'password'] as const;

    forbiddenPasswords.forEach((password) => {
      expect(isValidPassword(password, { forbiddenPasswords })).toEqual(
        falsyResult('forbidden')
      );
    });
  });

  it('should return false for a password with repeated characters exceeding the limit', () => {
    expect(isValidPassword('Password@1', { maxRepeatChars: 3 })).toEqual(
      truthyResult
    );

    expect(isValidPassword('PPPassword@1', { maxRepeatChars: 3 })).toEqual(
      falsyResult('consecutiveCharacters')
    );
    expect(isValidPassword('P한한한s@1', { maxRepeatChars: 3 })).toEqual(
      falsyResult('consecutiveCharacters')
    );
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
