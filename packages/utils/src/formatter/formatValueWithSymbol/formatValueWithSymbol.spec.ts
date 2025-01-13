import { describe, it, expect } from 'vitest';
import { formatValueWithSymbol } from './index';

describe('formatNumberWithSymbol', () => {
  describe('기본 동작', () => {
    it('옵션 없이 호출하면 문자열로 변환 후 반환해야 합니다.', () => {
      expect(formatValueWithSymbol(1000)).toBe('1000');
    });

    it('기본적으로 접미사(suffix) 위치에 기호를 추가해야 합니다.', () => {
      expect(formatValueWithSymbol(1000, { symbol: '원' })).toBe('1000원');
    });

    it('음수일 때 "-" 기호를 앞에 추가해야 합니다.', () => {
      expect(
        formatValueWithSymbol(-1000, { symbol: '$', position: 'prefix' })
      ).toBe('-$1000');
    });

    it('문자열도 정상적으로 포맷팅되어야 합니다.', () => {
      expect(formatValueWithSymbol('1000', { symbol: '원' })).toBe('1000원');
      expect(formatValueWithSymbol('1,234,567', { symbol: '원' })).toBe(
        '1,234,567원'
      );

      // 음수 처리
      expect(
        formatValueWithSymbol('-1,234,567', { symbol: '$', position: 'prefix' })
      ).toBe('-$1,234,567');
    });
  });

  describe('옵션 적용', () => {
    it('position 옵션을 기반으로 기호를 추가해야 합니다.', () => {
      expect(
        formatValueWithSymbol(1000, {
          symbol: '$',
          position: 'prefix',
        })
      ).toBe('$1000');

      expect(
        formatValueWithSymbol(1000, {
          symbol: '원',
          position: 'suffix',
        })
      ).toBe('1000원');
    });

    it('space가 true일 때 기호와 숫자 사이에 공백을 추가해야 합니다.', () => {
      expect(
        formatValueWithSymbol(1000, {
          symbol: '$',
          position: 'prefix',
          space: true,
        })
      ).toBe('$ 1000');

      expect(
        formatValueWithSymbol(1000, {
          symbol: '$',
          position: 'prefix',
          space: false,
        })
      ).toBe('$1000');
    });
  });
});
