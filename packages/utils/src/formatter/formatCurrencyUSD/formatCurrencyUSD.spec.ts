import { describe, it, expect } from 'vitest';
import { formatCurrencyUSD } from '.';

describe('formatCurrencyUSD', () => {
  it('양수를 올바르게 포맷팅해야 합니다', () => {
    expect(formatCurrencyUSD(1234567)).toBe('$1,234,567');
    expect(formatCurrencyUSD('1234567')).toBe('$1,234,567');
  });

  it('음수를 올바르게 포맷팅해야 합니다', () => {
    expect(formatCurrencyUSD(-1234567)).toBe('-$1,234,567');
    expect(formatCurrencyUSD('-1234567')).toBe('-$1,234,567');
  });

  it('소수점 자리수를 올바르게 포맷팅해야 합니다', () => {
    expect(formatCurrencyUSD(1234567.1234, { decimal: 2 })).toBe(
      '$1,234,567.12'
    );
    expect(formatCurrencyUSD(-1234567.1234, { decimal: 2 })).toBe(
      '-$1,234,567.12'
    );
  });

  it('유효하지 않은 입력에 대해 에러를 발생시켜야 합니다', () => {
    expect(() => formatCurrencyUSD('invalid')).toThrow(
      'value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.'
    );
  });
});
