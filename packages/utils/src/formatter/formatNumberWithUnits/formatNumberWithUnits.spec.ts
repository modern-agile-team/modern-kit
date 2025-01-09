import { describe, it, expect } from 'vitest';
import { formatNumberWithUnits } from './index';

describe('formatNumberWithUnits', () => {
  describe('기본 동작', () => {
    it('기본 단위로 숫자를 포맷팅한다', () => {
      expect(formatNumberWithUnits(1234567890000)).toBe('1조 2,345억 6,789만');
      expect(formatNumberWithUnits(1200000000)).toBe('12억');
      expect(formatNumberWithUnits(4010000)).toBe('401만');

      // 문자열
      expect(formatNumberWithUnits('1234567890000')).toBe(
        '1조 2,345억 6,789만'
      );
      expect(formatNumberWithUnits('1200000000')).toBe('12억');
      expect(formatNumberWithUnits('4010000')).toBe('401만');
    });

    it('음수를 처리할 수 있다', () => {
      expect(formatNumberWithUnits(-1234567890000)).toBe(
        '-1조 2,345억 6,789만'
      );
      expect(formatNumberWithUnits(-1000000000)).toBe('-10억');

      // 문자열
      expect(formatNumberWithUnits('-1234567890000')).toBe(
        '-1조 2,345억 6,789만'
      );
      expect(formatNumberWithUnits('-1000000000')).toBe('-10억');
    });

    it('0과 작은 숫자를 처리한다', () => {
      expect(formatNumberWithUnits(0)).toBe('0');
      expect(formatNumberWithUnits(9)).toBe('9');
    });
  });

  // 문자열 케이스는 제외
  describe('옵션 적용', () => {
    it('floorUnit 주어진 값에 따라 버림 단위를 적용해야 합니다.', () => {
      const value = 12345;

      expect(formatNumberWithUnits(value, { floorUnit: 10000 })).toBe('1만');

      // value보다 floorUnit이 크면 '0'을 반환
      expect(formatNumberWithUnits(value, { floorUnit: 100000 })).toBe('0');
    });

    it('commas가 true라면 ","를 추가하며, false라면 제외해야 합니다.', () => {
      expect(formatNumberWithUnits(1234567890000, { commas: false })).toBe(
        '1조 2345억 6789만'
      );
      expect(formatNumberWithUnits(1234567890000, { commas: true })).toBe(
        '1조 2,345억 6,789만'
      );
    });

    it('space가 true라면 단위 사이에 공백을 추가하며, false라면 제외해야 합니다.', () => {
      expect(formatNumberWithUnits(1234567890000, { space: false })).toBe(
        '1조2,345억6,789만'
      );
      expect(formatNumberWithUnits(1234567890000, { space: true })).toBe(
        '1조 2,345억 6,789만'
      );
    });

    it('decimal가 주어진 값에 따라 소수점 자리수를 적용해야 합니다.', () => {
      expect(formatNumberWithUnits(1234567.123, { decimal: 2 })).toBe(
        '123만 4,567.12'
      );

      // 만약, floorUnit가 1보다 크면 소수점 자리수를 적용하지 않습니다.
      expect(
        formatNumberWithUnits(1234567.123, { decimal: 2, floorUnit: 1000 })
      ).toBe('123만 4,000');
    });

    it('사용자 정의 단위를 적용할 수 있습니다.', () => {
      const customUnits = [
        { unit: 'K', value: 1000 },
        { unit: 'M', value: 1000000 },
      ];

      expect(
        formatNumberWithUnits(1234567, {
          units: customUnits,
          floorUnit: 1000,
        })
      ).toBe('1M 234K');

      // 단위 적용 X
      expect(
        formatNumberWithUnits(1234567, {
          units: [],
          floorUnit: 1000,
        })
      ).toBe('1,234,000');
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
      ).toThrow('floorUnit은 1 이상의 정수여야 합니다.');
    });

    it('decimal이 0보다 작으면 예외를 발생시킵니다.', () => {
      expect(() =>
        formatNumberWithUnits(1234567, { decimal: -1 as unknown as number })
      ).toThrow('decimal은 0 이상의 정수여야 합니다.');
    });
  });
});
