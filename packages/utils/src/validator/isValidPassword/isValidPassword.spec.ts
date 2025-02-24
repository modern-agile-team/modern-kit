import { describe, it, expect } from 'vitest';
import { isValidPassword } from '.';

const truthyResult = {
  isValid: true,
  errorReason: null,
};

const falsyResult = (errorReason: string) => ({
  isValid: false,
  errorReason,
});

describe('isValidPassword', () => {
  it('기본 옵션으로 유효한 비밀번호를 검증해야 합니다.', () => {
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

  it('사용자 정의 최소/최대 길이에 따라 비밀번호 길이를 검증해야 합니다.', () => {
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

  it('containsOptions에 따라 비밀번호를 검증해야 합니다.', () => {
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

  it('금지된 비밀번호 목록에 있는 비밀번호를 거부해야 합니다.', () => {
    const forbiddenPasswords = ['12345678', 'admin', 'password'] as const;

    forbiddenPasswords.forEach((password) => {
      expect(isValidPassword(password, { forbiddenPasswords })).toEqual(
        falsyResult('forbidden')
      );
    });
  });

  it('반복 문자 제한을 초과하는 비밀번호를 거부해야 합니다.', () => {
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

  it('유효하지 않은 길이 값에 대해 오류를 발생시켜야 합니다.', () => {
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
