import { describe, it, expect } from 'vitest';
import { drop } from '.';

describe('drop', () => {
  it('기본적으로 배열의 첫 번째 요소를 제거해야 합니다.', () => {
    const arr = [1, 2, 3];
    const result = drop(arr);

    expect(result).toEqual([2, 3]);
  });

  it('배열의 첫 n개 요소를 제거해야 합니다.', () => {
    const arr = [1, 2, 3];
    const result = drop(arr, 2);

    expect(result).toEqual([3]);
  });

  it('n이 배열의 길이보다 큰 경우 빈 배열을 반환해야 합니다.', () => {
    const arr = [1, 2, 3];
    const result = drop(arr, 4);

    expect(result).toEqual([]);
  });

  it('n이 0인 경우 동일한 배열을 반환해야 합니다.', () => {
    const arr = [1, 2, 3];
    const result = drop(arr, 0);

    expect(result).toEqual(arr);
  });

  it('n이 음수인 경우 원본 배열을 반환해야 합니다.', () => {
    const arr = [1, 2, 3];
    const result = drop(arr, -1);

    expect(result).toEqual(arr);
  });
});
