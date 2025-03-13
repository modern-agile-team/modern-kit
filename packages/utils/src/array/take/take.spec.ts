import { describe, it, expect } from 'vitest';
import { take } from '.';

describe('take', () => {
  it('count가 기본값일 때 첫 번째 인덱스를 반환해야 합니다', () => {
    const arr = [1, 2, 3];

    expect(take(arr)).toEqual([1]);
  });

  it('count가 0일 때 빈 배열을 반환해야 합니다', () => {
    const arr = [1, 2, 3];

    expect(take(arr, 0)).toEqual([]);
  });

  it('count가 양수일 때 올바른 배열을 반환해야 합니다', () => {
    const arr = [1, 2, 3];

    expect(take(arr, 2)).toEqual([1, 2]);
  });

  it('count가 음수일 때 빈 배열을 반환해야 합니다', () => {
    const arr = [1, 2, 3];

    expect(take(arr, -2)).toEqual([]);
  });

  it('count가 배열의 길이보다 클 때 원래 배열을 반환해야 합니다', () => {
    const arr = [1, 2, 3];

    expect(take(arr, 5)).toEqual([1, 2, 3]);
  });
});
