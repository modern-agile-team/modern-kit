import { describe, it, expect } from 'vitest';
import { average } from '.';

describe('average', () => {
  it('빈 배열의 경우 0을 반환해야 합니다.', () => {
    expect(average([])).toBe(0);
  });

  it('배열의 숫자들의 평균값을 반환해야 합니다.', () => {
    expect(average([1, 2, 3, 4, 5])).toBe(3);
    expect(average([10, 20, 30, 40, 50])).toBe(30);
  });

  it('iteratee가 주어진 경우 배열의 숫자들의 평균값을 반환해야 합니다.', () => {
    expect(
      average([{ value: 1 }, { value: 2 }, { value: 3 }], (item) => item.value)
    ).toBe(2);
    expect(
      average(
        [{ value: 10 }, { value: 20 }, { value: 30 }],
        (item) => item.value
      )
    ).toBe(20);
  });

  it('단일 요소 배열을 처리할 수 있어야 합니다.', () => {
    expect(average([5])).toBe(5);
    expect(average([{ value: 7 }], (item) => item.value)).toBe(7);
  });

  it('음수를 포함한 배열을 처리할 수 있어야 합니다.', () => {
    expect(average([-1, -2, -3, -4, -5])).toBe(-3);
    expect(
      average(
        [{ value: -10 }, { value: -20 }, { value: -30 }],
        (item) => item.value
      )
    ).toBe(-20);
  });
});
