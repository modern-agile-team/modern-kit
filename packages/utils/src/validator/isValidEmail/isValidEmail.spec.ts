import { isValidEmail } from '.';

describe('isValidEmail', () => {
  it('should return true if email is in an valid format', () => {
    expect(isValidEmail('user123@gmail.com')).toBeTruthy();
    expect(isValidEmail('user.jeon@yahoo.co.kr')).toBeTruthy();
    expect(isValidEmail('user^@naver.com')).toBeTruthy();
    expect(isValidEmail('User@example.com')).toBeTruthy();
    expect(isValidEmail('user@my-example.com')).toBeTruthy();
    expect(isValidEmail('user@sub.sub.example.com')).toBeTruthy();
  });

  it('should return false if email is in an invalid format', () => {
    expect(isValidEmail('invalid-email')).toBeFalsy();
    expect(isValidEmail('user@')).toBeFalsy();
    expect(isValidEmail('user @naver.com')).toBeFalsy();
    expect(isValidEmail('user@my_example.com')).toBeFalsy();
    expect(isValidEmail('user@example')).toBeFalsy();
    expect(isValidEmail('user@.com')).toBeFalsy();
  });
});
