import { describe, it, expect } from 'vitest';
import { max } from '.';

describe('max', () => {
  it('숫자 배열에서 최대값을 반환해야 합니다.', () => {
    const arr = [5, 2, 9, 1, 5, 6];
    const result = max(arr);

    expect(result).toBe(9);
  });

  it('반복자 함수를 기반으로 객체 배열에서 최대값을 가진 항목을 반환해야 합니다.', () => {
    const arr = [
      { value: 5 },
      { value: 2 },
      { value: 9 },
      { value: 1 },
      { value: 5 },
      { value: 6 },
    ];
    const result = max(arr, (item) => item.value);

    expect(result).toEqual({ value: 9 });
  });

  it('반복자 함수를 기반으로 문자열 배열에서 최대값을 가진 항목을 반환해야 합니다.', () => {
    const arr = ['apple', 'banana', 'lime'];
    const result = max(arr, (item) => item.length);

    expect(result).toBe('banana');
  });

  it('빈 배열이 주어졌을 때 undefined를 반환해야 합니다.(기본)', () => {
    const arr: number[] = [];
    const result = max(arr);

    expect(result).toBeUndefined();
  });

  it('빈 배열이 주어졌을 때 undefined를 반환해야 합니다.(반복자 함수)', () => {
    const arr: {
      value: number;
    }[] = [];
    const result = max(arr, (item) => item.value);

    expect(result).toBeUndefined();
  });
});
