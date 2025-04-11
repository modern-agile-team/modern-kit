import { describe, it, expect } from 'vitest';
import { min } from '.';

describe('min', () => {
  it('숫자 배열에서 최소값을 반환해야 합니다.', () => {
    const arr = [5, 2, 9, 1, 5, 6];

    expect(min(arr)).toBe(1);
  });

  it('iteratee 함수를 기반으로 객체 배열에서 최소값을 가진 항목을 반환해야 합니다.', () => {
    const arr = [
      { value: 5 },
      { value: 2 },
      { value: 9 },
      { value: 1 },
      { value: 5 },
      { value: 6 },
    ];

    expect(min(arr, (item) => item.value)).toEqual({ value: 1 });
  });

  it('빈 배열이 주어졌을 때 undefined를 반환해야 합니다.', () => {
    const arr1: number[] = [];

    expect(min(arr1)).toBeUndefined();

    const arr2: {
      value: number;
    }[] = [];

    expect(min(arr2, (item) => item.value)).toBeUndefined();
  });
});
