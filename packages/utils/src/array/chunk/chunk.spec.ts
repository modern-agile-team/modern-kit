import { describe, it, expect } from 'vitest';
import { chunk } from '../chunk';

describe('chunk', () => {
  it('size 매개변수에 따라 배열을 분할해야 합니다', () => {
    const arr1 = [1, 2, 3, 4, 5, 6];
    expect(chunk(arr1, 1)).toEqual([[1], [2], [3], [4], [5], [6]]);
    expect(chunk(arr1, 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);

    const arr2 = [1, 2, 3, 4, 5];
    expect(chunk(arr2, 3)).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });

  it('size 매개변수가 1인 경우 각 요소의 배열을 반환해야 합니다', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(chunk(arr, 1)).toEqual([[1], [2], [3], [4], [5], [6]]);
  });

  it('빈 배열이 주어지면 빈 배열을 반환해야 합니다', () => {
    const arr = [] as [];
    expect(chunk(arr, 3)).toEqual([]);
  });

  it('size 매개변수가 배열의 길이보다 큰 경우 배열을 그대로 반환해야 합니다', () => {
    const arr = [1, 2];
    expect(chunk(arr, 3)).toEqual([arr]);
  });

  it('size 매개변수가 유효하지 않은 경우 에러를 발생시켜야 합니다', () => {
    const arr = [1, 2];

    expect(() => chunk(arr, NaN)).toThrowError();
    expect(() => chunk(arr, 0)).toThrowError();
    expect(() => chunk(arr, 1.5)).toThrowError();
  });
});
