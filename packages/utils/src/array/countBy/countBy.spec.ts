import { describe, it, expect, expectTypeOf } from 'vitest';
import { countBy } from '.';

describe('countBy', () => {
  it('각 값의 발생 횟수를 정확하게 세어야 합니다', () => {
    const data = [1, 2, 3, 3, 2, 1, 3, 2, 1, 1];

    expect(countBy(data)).toEqual({
      1: 4,
      2: 3,
      3: 3,
    });
  });

  it('iteratee를 전달하면 각 값을 iteratee에 전달하여 발생 횟수를 세어야 합니다', () => {
    const data = ['a', 'b', 'c', 'A', 'B', 'C', 'A', 'b'];

    expect(countBy(data, (value) => value.toLowerCase())).toEqual({
      a: 3,
      b: 3,
      c: 2,
    });

    const data2 = [
      { address: 'seoul' },
      { address: 'incheon' },
      { address: 'seoul' },
      { address: 'busan' },
      { address: 'seoul' },
    ];

    expect(countBy(data2, (value) => value.address)).toEqual({
      seoul: 3,
      incheon: 1,
      busan: 1,
    });
  });
});
