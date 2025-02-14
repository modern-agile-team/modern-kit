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
  });

  it('숫자 혹은 숫자로 이뤄진 문자열이 아닌 경우 에러를 발생시켜야 합니다.', () => {
    expect(() => formatNumberWithCommas('123dd')).toThrow(
      'value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.'
    );
    expect(() => formatNumberWithCommas('ddd')).toThrow(
      'value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.'
    );
  });
});
