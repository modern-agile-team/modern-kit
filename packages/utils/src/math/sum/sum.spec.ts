import { describe, it, expect } from 'vitest';
import { sum } from '.';

describe('sum', () => {
  it('숫자 배열의 합을 계산해야 합니다.', () => {
    const result = sum([1, 2, 3, 4, 5]);

    expect(result).toBe(15);
  });

  it('빈 배열의 경우 0을 반환해야 합니다.', () => {
    const result = sum([]);

    expect(result).toBe(0);
  });

  it('iteratee 함수를 사용하여 합을 계산해야 합니다.', () => {
    const result = sum([1, 2, 3, 4, 5], (item) => item * 2);

    expect(result).toBe(30);
  });

  it('iteratee 함수가 0을 반환하는 경우 0을 반환해야 합니다.', () => {
    const result = sum([1, 2, 3, 4, 5], () => 0);

    expect(result).toBe(0);
  });

  it('iteratee 함수를 사용하여 객체 배열의 합을 계산해야 합니다.', () => {
    const arr = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const result = sum(arr, (item) => item.value);

    expect(result).toBe(6);
  });
});
