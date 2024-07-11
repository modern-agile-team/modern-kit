import { formatPhoneNumber } from '.';

describe.concurrent('formatPhoneNumber', () => {
  it('should return a phone number format', () => {
    const cellPhoneNumber = '01012341234';
    const localPhoneNumber1 = '0311231234';
    const localPhoneNumber2 = '03112341234';
    const seoulPhoneNumber1 = '021231234';
    const seoulPhoneNumber2 = '0212341234';
    const sameLocalPhoneNumber = '12341234';

    expect(formatPhoneNumber(cellPhoneNumber)).toBe('010-1234-1234');
    expect(formatPhoneNumber(localPhoneNumber1)).toBe('031-123-1234');
    expect(formatPhoneNumber(localPhoneNumber2)).toBe('031-1234-1234');
    expect(formatPhoneNumber(seoulPhoneNumber1)).toBe('02-123-1234');
    expect(formatPhoneNumber(seoulPhoneNumber2)).toBe('02-1234-1234');
    expect(formatPhoneNumber(sameLocalPhoneNumber)).toBe('1234-1234');
  });

  it('should remove all non-numeric characters and return a phone number format', () => {
    const unformattedStr1 = 'asb0 10 12 3 41 234 asb';
    const unformattedStr2 = '010-1234-1234';
    const unformattedStr3 = '(02)12351234';

    expect(formatPhoneNumber(unformattedStr1)).toBe('010-1234-1234');
    expect(formatPhoneNumber(unformattedStr2)).toBe('010-1234-1234');
    expect(formatPhoneNumber(unformattedStr3)).toBe('02-1235-1234');
  });

  it('should return a string with all non-numeric characters removed if the string is not in a valid phone number format', () => {
    const unformattedStr1 = '0102';
    const unformattedStr2 = 'abc';
    const unformattedStr3 = '     ';

    expect(formatPhoneNumber(unformattedStr1)).toBe('0102');
    expect(formatPhoneNumber(unformattedStr2)).toBe('');
    expect(formatPhoneNumber(unformattedStr3)).toBe('');
  });
});
