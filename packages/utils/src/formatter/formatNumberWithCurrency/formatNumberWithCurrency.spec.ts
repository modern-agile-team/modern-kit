import { describe, it, expect } from 'vitest';
import { formatNumberWithCurrency } from './index';

describe('formatNumberWithCurrency', () => {
  describe('기본 동작', () => {
    it('접미사(suffix) 위치에 통화 기호를 추가한다', () => {
      expect(formatNumberWithCurrency(45000, { currency: '원' })).toBe(
        '4만 5,000원'
      );

      expect(formatNumberWithCurrency('45000', { currency: '원' })).toBe(
        '4만 5,000원'
      );
    });

    it('접두사(prefix) 위치에 통화 기호를 추가한다', () => {
      expect(
        formatNumberWithCurrency(1000, {
          currency: '$',
          position: 'prefix',
        })
      ).toBe('$1,000');

      expect(
        formatNumberWithCurrency('1000', {
          currency: '$',
          position: 'prefix',
        })
      ).toBe('$1,000');
    });
  });

  describe('옵션 적용', () => {
    it('floorUnit 주어진 값에 따라 버림 단위를 적용해야 합니다.', () => {
      expect(
        formatNumberWithCurrency(12345, { floorUnit: 10000, currency: '원' })
      ).toBe('1만원');
    });

    it('commas가 true라면 ","를 추가하며, false라면 제외해야 합니다.', () => {
      expect(
        formatNumberWithCurrency(45000, { commas: false, currency: '원' })
      ).toBe('4만 5000원');

      expect(
        formatNumberWithCurrency(45000, { commas: true, currency: '원' })
      ).toBe('4만 5,000원');
    });

    it('space가 true라면 단위 사이에 공백을 추가하며, false라면 제외해야 합니다.', () => {
      expect(
        formatNumberWithCurrency(45000, { space: false, currency: '원' })
      ).toBe('4만5,000원');

      expect(
        formatNumberWithCurrency(45000, { space: true, currency: '원' })
      ).toBe('4만 5,000원');
    });

    it('사용자 정의 단위를 적용할 수 있습니다.', () => {
      const customUnits = [
        { unit: 'M', value: 1000000 },
        { unit: 'K', value: 1000 },
      ];

      expect(
        formatNumberWithCurrency(1234567, {
          units: customUnits,
          floorUnit: 1000000,
          currency: '$',
          position: 'prefix',
        })
      ).toBe('$1M');

      // 단위 적용 X
      expect(
        formatNumberWithCurrency(1234567, {
          units: [],
          floorUnit: 1000,
          currency: '$',
          position: 'prefix',
        })
      ).toBe('$1,234,000');
    });
  });
});
