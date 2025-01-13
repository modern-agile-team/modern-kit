import { describe, it, expect } from 'vitest';
import { formatNumberWithUnits } from './index';

const KRW_UNITS = [
  { unit: '조', value: 1_000_000_000_000 },
  { unit: '억', value: 100_000_000 },
  { unit: '만', value: 10_000 },
] as const;

describe('formatNumberWithUnits', () => {
  describe('기본 동작', () => {
    it('units 옵션이 주어지면 해당 단위로 숫자를 포맷팅한다', () => {
      expect(formatNumberWithUnits(1234567890000, { units: KRW_UNITS })).toBe(
        '1조 2,345억 6,789만'
      );
      expect(formatNumberWithUnits(1200000000, { units: KRW_UNITS })).toBe(
        '12억'
      );
      expect(formatNumberWithUnits(4010000, { units: KRW_UNITS })).toBe(
        '401만'
      );

      // 문자열
      expect(formatNumberWithUnits('1234567890000', { units: KRW_UNITS })).toBe(
        '1조 2,345억 6,789만'
      );
      expect(formatNumberWithUnits('1200000000', { units: KRW_UNITS })).toBe(
        '12억'
      );
      expect(formatNumberWithUnits('4010000', { units: KRW_UNITS })).toBe(
        '401만'
      );
    });

    it('음수를 처리할 수 있다', () => {
      expect(formatNumberWithUnits(-1234567890000, { units: KRW_UNITS })).toBe(
        '-1조 2,345억 6,789만'
      );
      expect(formatNumberWithUnits(-1000000000, { units: KRW_UNITS })).toBe(
        '-10억'
      );

      // 문자열
      expect(
        formatNumberWithUnits('-1234567890000', { units: KRW_UNITS })
      ).toBe('-1조 2,345억 6,789만');
      expect(formatNumberWithUnits('-1000000000', { units: KRW_UNITS })).toBe(
        '-10억'
      );
    });

    it('0과 작은 숫자를 처리한다', () => {
      expect(formatNumberWithUnits(0, { units: KRW_UNITS })).toBe('0');
      expect(formatNumberWithUnits(9, { units: KRW_UNITS })).toBe('9');
    });
  });

  // 문자열 케이스는 제외
  describe('옵션 적용', () => {
    it('floorUnit 주어진 값에 따라 버림 단위를 적용해야 합니다.', () => {
      expect(
        formatNumberWithUnits(12345, { floorUnit: 10000, units: KRW_UNITS })
      ).toBe('1만');

      // units 옵션이 주어지지 않으면 기본 단위로 포맷팅
      expect(formatNumberWithUnits(12345, { floorUnit: 10000 })).toBe('10,000');
    });

    it('commas가 true라면 ","를 추가하며, false라면 제외해야 합니다.', () => {
      expect(
        formatNumberWithUnits(1234567890000, {
          commas: false,
          units: KRW_UNITS,
        })
      ).toBe('1조 2345억 6789만');

      expect(
        formatNumberWithUnits(1234567890000, {
          commas: true,
          units: KRW_UNITS,
        })
      ).toBe('1조 2,345억 6,789만');

      // units 옵션이 주어지지 않으면 기본 단위로 포맷팅
      expect(formatNumberWithUnits(1234567890000, { commas: true })).toBe(
        '1,234,567,890,000'
      );
    });

    it('space가 true라면 unit 사이 공백을 추가하며, false라면 제외해야 합니다.', () => {
      expect(
        formatNumberWithUnits(1234567890000, {
          space: false,
          units: KRW_UNITS,
        })
      ).toBe('1조2,345억6,789만');

      expect(
        formatNumberWithUnits(1234567890000, {
          space: true,
          units: KRW_UNITS,
        })
      ).toBe('1조 2,345억 6,789만');

      // units 옵션이 주어지지 않으면 기본 단위로 포맷팅
      expect(formatNumberWithUnits(1234567890000, { space: true })).toBe(
        '1,234,567,890,000'
      );
    });

    it('decimal가 주어진 값에 따라 소수점 자리수를 적용해야 합니다.', () => {
      // units 옵션이 주어지지 않음
      expect(formatNumberWithUnits(1234567.123, { decimal: 2 })).toBe(
        '1,234,567.12'
      );

      // units 옵션이 주어짐
      expect(
        formatNumberWithUnits(1234567.123, { decimal: 2, units: KRW_UNITS })
      ).toBe('123만 4,567.12');

      // floorUnit이 1000으로 설정되어 있어서 1000 단위 미만은 버림 처리되고,
      // decimal이 2로 설정되어 있지만 floorUnit 단위 만큼 버림 처리 되었으므로 소수는 표시되지 않습니다.
      expect(
        formatNumberWithUnits(1234567.123, {
          decimal: 2,
          floorUnit: 1000,
          units: KRW_UNITS,
        })
      ).toBe('123만 4,000');
    });
  });

  describe('예외 케이스', () => {
    it('value가 숫자 혹은 숫자로 이뤄진 문자열이 아니면 예외를 발생시킵니다.', () => {
      expect(() => formatNumberWithUnits('d123ㅇ4567')).toThrow(
        'value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.'
      );
    });

    it('floorUnit가 1 이상의 정수가 아니면 예외를 발생시킵니다.', () => {
      expect(() =>
        formatNumberWithUnits(1234567, { floorUnit: -1 as unknown as 10 })
      ).toThrow('floorUnit은 1을 포함한 10의 제곱수여야 합니다.');
    });

    it('decimal이 0보다 작으면 예외를 발생시킵니다.', () => {
      expect(() =>
        formatNumberWithUnits(1234567, { decimal: -1 as unknown as number })
      ).toThrow('decimal은 0 이상의 정수여야 합니다.');
    });
  });
});
