import { describe, it, expect } from 'vitest';
import { max } from '.';

describe('max', () => {
  it('숫자 배열에서 최대값을 반환해야 합니다.', () => {
    const arr = [5, 2, 9, 1, 5, 6];

    expect(max(arr)).toBe(9);
  });

  it('iteratee 함수를 기반으로 객체 배열에서 최대값을 가진 항목을 반환해야 합니다.', () => {
    const arr = [
      { value: 5 },
      { value: 2 },
      { value: 9 },
      { value: 1 },
      { value: 5 },
      { value: 6 },
    ];

    expect(max(arr, (item) => item.value)).toEqual({ value: 9 });
  });

  it('빈 배열이 주어졌을 때 undefined를 반환해야 합니다.(기본)', () => {
    const arr1: number[] = [];

    expect(max(arr1)).toBeUndefined();

    const arr2: {
      value: number;
    }[] = [];

    expect(max(arr2, (item) => item.value)).toBeUndefined();
  });
});
