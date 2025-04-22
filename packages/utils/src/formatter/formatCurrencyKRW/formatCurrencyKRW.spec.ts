import { describe, it, expect } from 'vitest';
import { formatCurrencyKRW } from '.';

describe('formatCurrencyKRW', () => {
  it('양수를 올바르게 포맷팅해야 합니다', () => {
    expect(formatCurrencyKRW(1234567.89112)).toBe('1,234,567.89112원');
  });

  it('음수를 올바르게 포맷팅해야 합니다', () => {
    expect(formatCurrencyKRW(-1234567.89112)).toBe('-1,234,567.89112원');
  });

  it('문자열 숫자를 올바르게 포맷팅해야 합니다', () => {
    expect(formatCurrencyKRW('1234567.89112')).toBe('1,234,567.89112원');
  });

  it('유효하지 않은 입력에 대해 에러를 발생시켜야 합니다', () => {
    expect(() => formatCurrencyKRW('invalid')).toThrow(
      'value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.'
    );
  });
});
