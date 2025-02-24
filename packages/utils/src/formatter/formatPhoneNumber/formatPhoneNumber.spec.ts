import { describe, it, expect } from 'vitest';
import { formatPhoneNumber } from '.';

describe('formatPhoneNumber', () => {
  it('전화번호 형식으로 반환해야 합니다.', () => {
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

  it('숫자가 아닌 모든 문자를 제거하고 전화번호 형식으로 반환해야 합니다.', () => {
    const unformattedStr1 = 'asb0 10 12 3 41 234 asb';
    const unformattedStr2 = '010-1234-1234';
    const unformattedStr3 = '(02)12351234';

    expect(formatPhoneNumber(unformattedStr1)).toBe('010-1234-1234');
    expect(formatPhoneNumber(unformattedStr2)).toBe('010-1234-1234');
    expect(formatPhoneNumber(unformattedStr3)).toBe('02-1235-1234');
  });

  it('유효하지 않은 전화번호 형식일 경우 숫자가 아닌 모든 문자가 제거된 문자열을 반환해야 합니다.', () => {
    const unformattedStr1 = '0102';
    const unformattedStr2 = 'abc';
    const unformattedStr3 = '     ';

    expect(formatPhoneNumber(unformattedStr1)).toBe('0102');
    expect(formatPhoneNumber(unformattedStr2)).toBe('');
    expect(formatPhoneNumber(unformattedStr3)).toBe('');
  });
});
