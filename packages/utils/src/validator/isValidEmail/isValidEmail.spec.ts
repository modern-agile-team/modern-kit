import { describe, it, expect } from 'vitest';
import { isValidEmail } from '.';

describe('isValidEmail', () => {
  it('유효한 이메일 형식이면 true를 반환해야 합니다.', () => {
    expect(isValidEmail('user123@gmail.com')).toBeTruthy();
    expect(isValidEmail('user.jeon@yahoo.co.kr')).toBeTruthy();
    expect(isValidEmail('user^@naver.com')).toBeTruthy();
    expect(isValidEmail('User@example.com')).toBeTruthy();
    expect(isValidEmail('user@my-example.com')).toBeTruthy();
    expect(isValidEmail('user@sub.sub.example.com')).toBeTruthy();
  });
  it('유효하지 않은 이메일 형식이면 false를 반환해야 합니다.', () => {
    expect(isValidEmail('invalid-email')).toBeFalsy();
    expect(isValidEmail('user@')).toBeFalsy();
    expect(isValidEmail('user @naver.com')).toBeFalsy();
    expect(isValidEmail('user@my_example.com')).toBeFalsy();
    expect(isValidEmail('user@example')).toBeFalsy();
    expect(isValidEmail('user@.com')).toBeFalsy();
  });
});
