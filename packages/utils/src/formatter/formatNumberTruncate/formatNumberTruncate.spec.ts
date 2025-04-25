import { describe, it, expect } from 'vitest';
import { formatNumberTruncate } from '.';

describe('formatNumberTruncate', () => {
  it('양수를 주어진 절삭 단위 밑으로 버려 올바르게 포맷팅해야 합니다.(소수점 포함)', () => {
    expect(formatNumberTruncate(1234567, 1)).toBe(1234567);
    expect(formatNumberTruncate(1234567, 10)).toBe(1234560);
    expect(formatNumberTruncate(1234567, 100)).toBe(1234500);
    expect(formatNumberTruncate(1234567, 1000)).toBe(1234000);
    expect(formatNumberTruncate(1234567, 10000)).toBe(1230000);
    expect(formatNumberTruncate(1234567, 100000)).toBe(1200000);
    expect(formatNumberTruncate(1234567, 1000000)).toBe(1000000);
  });

  it('음수를 주어진 절삭 단위 밑으로 버려 올바르게 포맷팅해야 합니다.(소수점 포함)', () => {
    expect(formatNumberTruncate(-1234567, 1)).toBe(-1234567);
    expect(formatNumberTruncate(-1234567, 10)).toBe(-1234560);
    expect(formatNumberTruncate(-1234567, 100)).toBe(-1234500);
    expect(formatNumberTruncate(-1234567, 1000)).toBe(-1234000);
    expect(formatNumberTruncate(-1234567, 10000)).toBe(-1230000);
    expect(formatNumberTruncate(-1234567, 100000)).toBe(-1200000);
    expect(formatNumberTruncate(-1234567, 1000000)).toBe(-1000000);
  });

  it('소수점은 버려야 합니다', () => {
    expect(formatNumberTruncate(1234567.1234, 1000)).toBe(1234000);
    expect(formatNumberTruncate(-1234567.1234, 1000)).toBe(-1234000);
  });

  it('절삭 단위가 주어진 값보다 크면 0을 반환해야 합니다', () => {
    expect(formatNumberTruncate(1234567, 10000000)).toBe(0);
  });

  it('값으로 NaN을 받으면 NaN을 반환해야 합니다', () => {
    expect(formatNumberTruncate(NaN, 100)).toBe(NaN);
  });

  it('값으로 Infinity를 받으면 Infinity를 반환해야 합니다', () => {
    expect(formatNumberTruncate(Infinity, 100)).toBe(Infinity);
  });

  it('절삭 단위가 1을 포함한 10의 제곱수가 아니면 오류를 발생시켜야 합니다', () => {
    expect(() => formatNumberTruncate(1234567, 33 as unknown as 10)).toThrow(
      'truncationUnit은 1을 포함한 10의 제곱수만 허용됩니다.'
    );

    expect(() => formatNumberTruncate(1234567, -1 as unknown as 10)).toThrow(
      'truncationUnit은 1을 포함한 10의 제곱수만 허용됩니다.'
    );

    expect(() => formatNumberTruncate(1234567, 0.1 as unknown as 10)).toThrow(
      'truncationUnit은 1을 포함한 10의 제곱수만 허용됩니다.'
    );
  });
});
