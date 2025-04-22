import { describe, it, expect } from 'vitest';
import { formatCurrencyKRWWithUnits } from '.';

describe('formatCurrencyKRWWithUnits', () => {
  it('큰 숫자를 단위와 통화 기호로 올바르게 포맷팅해야 합니다', () => {
    expect(formatCurrencyKRWWithUnits(1_234_567_890_123)).toBe(
      '1조 2,345억 6,789만 123원'
    );
    expect(formatCurrencyKRWWithUnits('1234567890123')).toBe(
      '1조 2,345억 6,789만 123원'
    );
  });

  it('숫자를 단위와 통화 기호로 올바르게 포맷팅해야 합니다', () => {
    expect(formatCurrencyKRWWithUnits(123_456_789)).toBe('1억 2,345만 6,789원');
    expect(formatCurrencyKRWWithUnits('123456789')).toBe('1억 2,345만 6,789원');
  });

  it('작은 숫자를 통화 기호로 올바르게 포맷팅해야 합니다', () => {
    expect(formatCurrencyKRWWithUnits(999)).toBe('999원');
    expect(formatCurrencyKRWWithUnits('999')).toBe('999원');
  });

  it('commas 옵션을 통해 쉼표를 사용할 수 있어야 합니다.', () => {
    expect(formatCurrencyKRWWithUnits(123456789, { commas: false })).toBe(
      '1억 2345만 6789원'
    );
    expect(formatCurrencyKRWWithUnits('123456789', { commas: false })).toBe(
      '1억 2345만 6789원'
    );
  });

  it('decimal 옵션을 통해 소수점을 허용할 수 있어야 합니다.', () => {
    expect(formatCurrencyKRWWithUnits(123456789.12, { decimal: 2 })).toBe(
      '1억 2,345만 6,789.12원'
    );
    expect(formatCurrencyKRWWithUnits('123456789.12', { decimal: 2 })).toBe(
      '1억 2,345만 6,789.12원'
    );
  });

  it('유효하지 않은 입력에 대해 에러를 발생시켜야 합니다', () => {
    expect(() => formatCurrencyKRWWithUnits('invalid')).toThrow(
      'value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.'
    );
  });
});
