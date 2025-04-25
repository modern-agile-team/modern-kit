import { describe, it, expect } from 'vitest';
import { formatValueWithSymbol } from '.';

describe('formatValueWithSymbol', () => {
  it('기호를 접미사로 추가해야 합니다', () => {
    expect(formatValueWithSymbol(1234567, { suffix: '원' })).toBe('1234567원');
    expect(formatValueWithSymbol('1234567', { suffix: '원' })).toBe(
      '1234567원'
    );
  });

  it('기호를 접두사로 추가해야 합니다', () => {
    expect(formatValueWithSymbol(1234567, { prefix: '$' })).toBe('$1234567');
    expect(formatValueWithSymbol('1234567', { prefix: '$' })).toBe('$1234567');
  });

  it('기호를 접두사와 접미사 모두에 추가해야 합니다', () => {
    expect(formatValueWithSymbol(1234567, { prefix: '*', suffix: '@' })).toBe(
      '*1234567@'
    );
    expect(formatValueWithSymbol('1234567', { prefix: '*', suffix: '@' })).toBe(
      '*1234567@'
    );
  });
});
