import { describe, it, expect } from 'vitest';
import { formatNumberFloorUnit } from '.';

describe('formatNumberFloorUnit', () => {
  it('양수를 올바르게 포맷팅해야 합니다', () => {
    expect(formatNumberFloorUnit(1234567, 1000)).toBe(1234000);
  });

  it('음수를 올바르게 포맷팅해야 합니다', () => {
    expect(formatNumberFloorUnit(-1234567, 1000)).toBe(-1234000);
  });
});
