import { describe, expect, it } from 'vitest';
import { flatMapDeep } from '.';

describe('flatMapDeep', () => {
  it('배열을 매핑하고 깊게 평탄화해야 합니다.', () => {
    const result1 = flatMapDeep([1, 2, 3], (n) => [[n, n]]);
    expect(result1).toEqual([1, 1, 2, 2, 3, 3]);

    const result2 = flatMapDeep([1, 2, 3], (n) => [[[n]], [[n]]]);
    expect(result2).toEqual([1, 1, 2, 2, 3, 3]);

    const result3 = flatMapDeep([1, 2, 3], (n) => [n, [n, [n, [n]]]]);
    expect(result3).toEqual([1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3]);
  });

  it('빈 배열이 제공되면 빈 배열을 반환해야 합니다.', () => {
    const result = flatMapDeep([], (n) => [[n]]);
    expect(result).toEqual([]);
  });
});
