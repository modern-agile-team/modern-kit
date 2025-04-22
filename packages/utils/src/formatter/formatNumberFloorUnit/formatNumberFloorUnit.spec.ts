import { describe, it, expect } from 'vitest';
import { formatNumberFloorUnit } from '.';

describe('formatNumberFloorUnit', () => {
  it('양수를 올바르게 포맷팅해야 합니다', () => {
    expect(formatNumberFloorUnit(1234567, 1000)).toBe(1234000);
  });

  it('음수를 올바르게 포맷팅해야 합니다', () => {
    expect(formatNumberFloorUnit(-1234567, 1000)).toBe(-1234000);
  });

  it('NaN을 인자로 받으면 NaN을 반환해야 합니다', () => {
    expect(formatNumberFloorUnit(NaN, 1000)).toBe(NaN);
  });

  it('Infinity를 인자로 받으면 무한대를 반환해야 합니다', () => {
    expect(formatNumberFloorUnit(Infinity, 1000)).toBe(Infinity);
  });
});
