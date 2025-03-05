import { describe, it, expect } from 'vitest';
import { extractNumber } from '.';

describe('extractNumber', () => {
  it('숫자가 아닌 모든 문자가 제거된 문자열을 반환해야 합니다.', () => {
    expect(extractNumber('abc123sd45')).toBe('12345');
    expect(extractNumber('1 23 sd 4 5')).toBe('12345');

    expect(extractNumber('🥲')).toBe('');
    expect(extractNumber('   ')).toBe('');
  });
});
