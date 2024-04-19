import { isValidPhoneNumberFormat } from '.';

describe('isValidPhoneNumberFormat', () => {
  it('should return "true" when the phone number format is valid with hyphens', () => {
    expect(isValidPhoneNumberFormat('010-1234-1234')).toBeTruthy();
    expect(isValidPhoneNumberFormat('031-123-1234')).toBeTruthy();
    expect(isValidPhoneNumberFormat('031-1234-1234')).toBeTruthy();
    expect(isValidPhoneNumberFormat('070-1234-5678')).toBeTruthy();
    expect(isValidPhoneNumberFormat('02-123-1234')).toBeTruthy();
    expect(isValidPhoneNumberFormat('02-1234-1234')).toBeTruthy();
    expect(isValidPhoneNumberFormat('1234-1234')).toBeTruthy();
    expect(isValidPhoneNumberFormat('010-1234-1234')).toBeTruthy();
  });

  it('should return "false" when the phone number format is invalid with hyphens', () => {
    expect(isValidPhoneNumberFormat('0-1234-1234')).toBeFalsy();
    expect(isValidPhoneNumberFormat('0-123-1234')).toBeFalsy();
    expect(isValidPhoneNumberFormat('0101-123-1234')).toBeFalsy();
    expect(isValidPhoneNumberFormat('010-12-1234')).toBeFalsy();
    expect(isValidPhoneNumberFormat('010-12455-1234')).toBeFalsy();
    expect(isValidPhoneNumberFormat('01012551234')).toBeFalsy();
  });
});
