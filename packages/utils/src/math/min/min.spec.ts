import { describe, it, expect } from 'vitest';
import { min } from '.';

describe('min', () => {
  it('숫자 배열에서 최소값을 반환해야 합니다.', () => {
    const arr = [5, 2, 9, 1, 5, 6];
    const result = min(arr);

    expect(result).toBe(1);
  });

  it('반복자 함수를 기반으로 객체 배열에서 최소값을 가진 항목을 반환해야 합니다.', () => {
    const arr = [
      { value: 5 },
      { value: 2 },
      { value: 9 },
      { value: 1 },
      { value: 5 },
      { value: 6 },
    ];
    const result = min(arr, (item) => item.value);

    expect(result).toEqual({ value: 1 });
  });

  it('반복자 함수를 기반으로 문자열 배열에서 최소값을 가진 항목을 반환해야 합니다.', () => {
    const arr = ['apple', 'banana', 'lime'];
    const result = min(arr, (item) => item.length);

    expect(result).toBe('lime');
  });

  it('빈 배열이 주어졌을 때 undefined를 반환해야 합니다.(기본)', () => {
    const arr: number[] = [];
    const result = min(arr);

    expect(result).toBeUndefined();
  });

  it('빈 배열이 주어졌을 때 undefined를 반환해야 합니다.(반복자 함수)', () => {
    const arr: {
      value: number;
    }[] = [];
    const result = min(arr, (item) => item.value);

    expect(result).toBeUndefined();
  });
});
