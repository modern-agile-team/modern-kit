import { describe, it, expect } from 'vitest';
import { formatNumberWithCommas } from '.';

const ERROR_MESSAGE = 'value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.';

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
  });

  it('숫자로만 구성되어 있지 않은 문자열의 경우 에러를 던져야 합니다.', () => {
    expect(() => formatNumberWithCommas('123d')).toThrow(ERROR_MESSAGE);
    expect(() => formatNumberWithCommas('1.2.3')).toThrow(ERROR_MESSAGE);
    expect(() => formatNumberWithCommas('d1.2.3')).toThrow(ERROR_MESSAGE);
  });
});
