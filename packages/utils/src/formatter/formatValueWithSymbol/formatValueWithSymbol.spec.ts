import { describe, it, expect } from 'vitest';
import { formatValueWithSymbol } from '.';

describe('formatValueWithSymbol', () => {
  it('기본적으로 기호를 접미사로 추가해야 합니다', () => {
    expect(formatValueWithSymbol(1234567, { symbol: '원' })).toBe('1234567원');
    expect(formatValueWithSymbol('1234567', { symbol: '원' })).toBe(
      '1234567원'
    );
  });

  it('기호를 접두사로 추가해야 합니다', () => {
    expect(
      formatValueWithSymbol(1234567, { symbol: '$', position: 'prefix' })
    ).toBe('$1234567');
    expect(
      formatValueWithSymbol('1234567', { symbol: '$', position: 'prefix' })
    ).toBe('$1234567');
  });

  it('기호를 접두사와 접미사 모두에 추가해야 합니다', () => {
    expect(
      formatValueWithSymbol(1234567, { symbol: '*', position: 'both' })
    ).toBe('*1234567*');
    expect(
      formatValueWithSymbol('1234567', { symbol: '*', position: 'both' })
    ).toBe('*1234567*');
  });

  it('빈 기호를 처리해야 합니다', () => {
    expect(formatValueWithSymbol(1234567, { symbol: '' })).toBe('1234567');
  });
});
