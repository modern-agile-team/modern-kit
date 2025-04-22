import { describe, it, expect } from 'vitest';
import { formatNumberWithUnits } from '.';

const KRW_UNITS = [
  { unit: '조', value: 1_000_000_000_000 },
  { unit: '억', value: 100_000_000 },
  { unit: '만', value: 10_000 },
];

describe('formatNumberWithUnits', () => {
  it('숫자를 단위별로 올바르게 포맷팅해야 합니다', () => {
    expect(formatNumberWithUnits(123456789, { units: KRW_UNITS })).toBe(
      '1억 2,345만 6,789'
    );
  });

  it('문자열로 된 숫자를 단위별로 올바르게 포맷팅해야 합니다', () => {
    expect(formatNumberWithUnits('123456789', { units: KRW_UNITS })).toBe(
      '1억 2,345만 6,789'
    );
  });

  it('음수를 올바르게 포맷팅해야 합니다', () => {
    expect(formatNumberWithUnits(-123456789, { units: KRW_UNITS })).toBe(
      '-1억 2,345만 6,789'
    );
    expect(
      formatNumberWithUnits(-123456789.12, { units: KRW_UNITS, decimal: 2 })
    ).toBe('-1억 2,345만 6,789.12');
  });

  it('소수점을 포함한 숫자를 올바르게 포맷팅해야 합니다', () => {
    expect(
      formatNumberWithUnits(123456789.12, { units: KRW_UNITS, decimal: 2 })
    ).toBe('1억 2,345만 6,789.12');
  });

  it('가장 작은 단위보다 작은 숫자를 처리해야 합니다', () => {
    expect(formatNumberWithUnits(999, { units: KRW_UNITS })).toBe('999');
  });

  it('단위와 정확히 일치하는 숫자를 처리해야 합니다', () => {
    expect(formatNumberWithUnits(10000, { units: KRW_UNITS })).toBe('1만');
  });

  it('쉼표를 사용하지 않아야 합니다', () => {
    expect(
      formatNumberWithUnits(123456789, { units: KRW_UNITS, commas: false })
    ).toBe('1억 2345만 6789');
  });

  it('유효하지 않은 입력에 대해 에러를 발생시켜야 합니다', () => {
    expect(() =>
      formatNumberWithUnits('invalid', { units: KRW_UNITS })
    ).toThrow('value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.');
  });
});
