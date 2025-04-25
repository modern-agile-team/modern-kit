import { describe, it, expect } from 'vitest';
import { formatCurrencyKRWWithUnits } from '.';

describe('formatCurrencyKRWWithUnits', () => {
  it('큰 숫자를 단위와 통화 기호로 올바르게 포맷팅해야 합니다', () => {
    expect(formatCurrencyKRWWithUnits(1234567891234)).toBe(
      '1조 2,345억 6,789만 1,234원'
    );
    expect(formatCurrencyKRWWithUnits('1234567891234')).toBe(
      '1조 2,345억 6,789만 1,234원'
    );

    expect(formatCurrencyKRWWithUnits(123456789)).toBe('1억 2,345만 6,789원');
    expect(formatCurrencyKRWWithUnits('123456789')).toBe('1억 2,345만 6,789원');

    expect(formatCurrencyKRWWithUnits(1234567)).toBe('123만 4,567원');
    expect(formatCurrencyKRWWithUnits('1234567')).toBe('123만 4,567원');

    expect(formatCurrencyKRWWithUnits(12345)).toBe('1만 2,345원');
    expect(formatCurrencyKRWWithUnits('12345')).toBe('1만 2,345원');

    expect(formatCurrencyKRWWithUnits(1234)).toBe('1,234원');
    expect(formatCurrencyKRWWithUnits('1234')).toBe('1,234원');

    expect(formatCurrencyKRWWithUnits(123)).toBe('123원');
    expect(formatCurrencyKRWWithUnits('123')).toBe('123원');
  });

  it('음수를 올바르게 포맷팅해야 합니다', () => {
    expect(formatCurrencyKRWWithUnits(-123456789)).toBe('-1억 2,345만 6,789원');
    expect(formatCurrencyKRWWithUnits('-123456789')).toBe(
      '-1억 2,345만 6,789원'
    );
  });

  it('decimal 옵션을 통해 소수점 자리수를 설정할 수 있어야 합니다', () => {
    expect(formatCurrencyKRWWithUnits(123456789.1234, { decimal: 2 })).toBe(
      '1억 2,345만 6,789.12원'
    );
    expect(formatCurrencyKRWWithUnits(-123456789.1234, { decimal: 2 })).toBe(
      '-1억 2,345만 6,789.12원'
    );
  });

  it('유효하지 않은 입력에 대해 에러를 발생시켜야 합니다', () => {
    expect(() => formatCurrencyKRWWithUnits('invalid')).toThrow(
      'value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.'
    );
  });
});
