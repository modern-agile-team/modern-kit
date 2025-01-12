import { describe, it, expect } from 'vitest';
import { formatNumberWithCurrency } from './index';
import { Locale } from './formatNumberWithCurrency.types';

describe('formatNumberWithCurrency', () => {
  describe('기본 동작', () => {
    it('옵션 없이 호출하면 숫자만 반환해야 합니다.', () => {
      expect(formatNumberWithCurrency(1000)).toBe('1,000');
      expect(formatNumberWithCurrency('1000')).toBe('1,000');
    });

    it('기본적으로 접미사(suffix) 위치에 통화 기호를 추가해야 합니다.', () => {
      expect(formatNumberWithCurrency(1000, { symbol: '원' })).toBe('1,000원');
      expect(formatNumberWithCurrency('1000', { symbol: '원' })).toBe(
        '1,000원'
      );
    });

    it('음수일 때 통화 기호를 앞에 추가해야 합니다.', () => {
      expect(
        formatNumberWithCurrency(-1000, { symbol: '$', position: 'prefix' })
      ).toBe('-$1,000');
      expect(
        formatNumberWithCurrency('-1000', { symbol: '$', position: 'prefix' })
      ).toBe('-$1,000');
    });
  });

  describe('옵션 적용', () => {
    it('position 옵션을 기반으로 기호를 추가해야 합니다.', () => {
      expect(
        formatNumberWithCurrency(1000, {
          symbol: '$',
          position: 'prefix',
        })
      ).toBe('$1,000');

      expect(
        formatNumberWithCurrency(1000, {
          symbol: '$',
          position: 'suffix',
        })
      ).toBe('1,000$');
    });

    it('space가 true일 때 통화 기호와 숫자 사이에 공백을 추가해야 합니다.', () => {
      expect(
        formatNumberWithCurrency(1000, {
          symbol: '$',
          position: 'prefix',
          space: true,
        })
      ).toBe('$ 1,000');

      expect(
        formatNumberWithCurrency(1000, {
          symbol: '$',
          position: 'prefix',
          space: false,
        })
      ).toBe('$1,000');
    });

    it('commas 옵션을 기반으로 쉼표를 추가해야 합니다.', () => {
      expect(
        formatNumberWithCurrency(1000, {
          symbol: '$',
          position: 'prefix',
          commas: true,
        })
      ).toBe('$1,000');

      expect(
        formatNumberWithCurrency(1000, {
          symbol: '$',
          position: 'prefix',
          commas: false,
        })
      ).toBe('$1000');
    });

    it('decimal 옵션을 기반으로 소숫점 자리수를 포맷팅해야 합니다.', () => {
      expect(
        formatNumberWithCurrency(1000.234, {
          symbol: '$',
          position: 'prefix',
          decimal: 3,
        })
      ).toBe('$1,000.234');

      expect(
        formatNumberWithCurrency(1000.23, {
          symbol: '$',
          position: 'prefix',
          decimal: 0,
        })
      ).toBe('$1,000');
    });

    it('locale 옵션이 있으면 locale 옵션에 따라 통화 기호가 적용되어야 합니다.', () => {
      expect(
        formatNumberWithCurrency(1000, {
          locale: 'en-US', // { symbol: '$', position: 'prefix', space: false, commas: true }
        })
      ).toBe('$1,000');

      expect(
        formatNumberWithCurrency(1000, {
          locale: 'ko-KR', // { symbol: '₩', position: 'prefix', space: false, commas: true }
        })
      ).toBe('₩1,000');

      // 소숫점 자리수 포맷팅
      expect(
        formatNumberWithCurrency(1000.123, {
          locale: 'en-US', // { symbol: '$', position: 'prefix', space: false, commas: true }
          decimal: 2,
        })
      ).toBe('$1,000.12');
    });
  });

  describe('에러 처리', () => {
    it('숫자가 아닌 값이 주어지면 에러를 던져야 합니다.', () => {
      expect(() => formatNumberWithCurrency('10d00')).toThrow(
        'value는 숫자 혹은 숫자로 이뤄진 문자열이여야 합니다.'
      );
    });

    it('decimal이 0 이상의 정수가 아닌 경우 에러를 던져야 합니다.', () => {
      expect(() => formatNumberWithCurrency(1000, { decimal: -1 })).toThrow(
        'decimal은 0 이상의 정수여야 합니다.'
      );
    });

    it('지원하지 않는 locale 입력시 에러를 던져야 합니다.', () => {
      expect(() =>
        formatNumberWithCurrency(1000, {
          locale: 'INVALID' as unknown as Locale,
        })
      ).toThrow('유효하지 않은 locale 입니다.');
    });
  });
});
