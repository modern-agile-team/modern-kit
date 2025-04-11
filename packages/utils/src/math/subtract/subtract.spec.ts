import { describe, expect, it } from 'vitest';
import { subtract } from '.';

describe('subtract', () => {
  it('숫자 배열의 요소들을 순차적으로 뺄셈해야 합니다.', () => {
    const result = subtract([10, 2, 3]);

    expect(result).toBe(5);
  });

  it('빈 배열의 경우 0을 반환해야 합니다.', () => {
    const result = subtract([]);

    expect(result).toBe(0);
  });

  it('iteratee 함수를 사용하여 뺄셈을 계산해야 합니다.', () => {
    const result = subtract([10, 2, 3], (item) => item * 2);

    expect(result).toBe(10);
  });

  it('iteratee 함수가 0을 반환하는 경우 0을 반환해야 합니다.', () => {
    const result = subtract([1, 2, 3, 4, 5], () => 0);

    expect(result).toBe(0);
  });

  it('iteratee 함수를 사용하여 객체 배열의 뺄셈을 계산해야 합니다.', () => {
    const arr = [{ value: 10 }, { value: 2 }, { value: 3 }];
    const result = subtract(arr, (item) => item.value);

    expect(result).toBe(5);
  });

  it('음수를 포함한 배열의 뺄셈을 올바르게 계산해야 합니다.', () => {
    const result = subtract([10, -2, 3]);

    expect(result).toBe(9);
  });
});
