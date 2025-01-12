import { describe, it, expect } from 'vitest';
import { formatNumberWithCommas } from '.';

describe('formatNumberWithCommas', () => {
  it('숫자에 천 단위마다 ","를 추가하고 문자열로 반환해야 합니다.', () => {
    expect(formatNumberWithCommas(200)).toBe('200');
    expect(formatNumberWithCommas(3000)).toBe('3,000');
    expect(formatNumberWithCommas(50000)).toBe('50,000');
    expect(formatNumberWithCommas(-50000)).toBe('-50,000');
    expect(formatNumberWithCommas(123123123)).toBe('123,123,123');
    expect(formatNumberWithCommas(123456.12345)).toBe('123,456.12345');
  });

  it('숫자로 이뤄진 문자열에도 ","를 추가해 반환해야 합니다.', () => {
    expect(formatNumberWithCommas('200')).toBe('200');
    expect(formatNumberWithCommas('3000')).toBe('3,000');
    expect(formatNumberWithCommas('50000')).toBe('50,000');
    expect(formatNumberWithCommas('-50000')).toBe('-50,000');
    expect(formatNumberWithCommas('123123123')).toBe('123,123,123');
    expect(formatNumberWithCommas('123456.12345')).toBe('123,456.12345');
    expect(formatNumberWithCommas('1433만 4567')).toBe('1,433만 4,567');
  });

  it('일반적인 문자열의 경우에도 숫자에 천 단위마다 ","를 추가해야 합니다.', () => {
    expect(formatNumberWithCommas('1433만 4567')).toBe('1,433만 4,567');
    expect(formatNumberWithCommas('1433만 4567.12345')).toBe(
      '1,433만 4,567.12345'
    );
    expect(formatNumberWithCommas('1234ddd')).toBe('1,234ddd');
  });

  it('숫자가 없는 문자열의 경우 문자열을 그대로 반환해야 합니다.', () => {
    expect(formatNumberWithCommas('')).toBe('');
    expect(formatNumberWithCommas('ddd')).toBe('ddd');
  });
});
