import { describe, it, expect } from 'vitest';
import { swap } from '.';

describe('swap', () => {
  it('배열의 요소를 교환해야 합니다', () => {
    const arr = [1, 2, 3];
    const result = swap(arr, 0, 2);

    expect(result).toEqual([3, 2, 1]);
    expect(arr).toBe(result);
  });

  it('지정된 경우 불변 방식으로 요소를 교환해야 합니다', () => {
    const arr = [1, 2, 3];
    const result = swap(arr, 0, 2, { immutable: true });

    expect(result).toEqual([3, 2, 1]);
    expect(arr).not.toBe(result);
  });

  it('지정된 경우 가변 방식으로 요소를 교환해야 합니다', () => {
    const arr = [1, 2, 3];
    const result = swap(arr, 0, 2, { immutable: false });

    expect(result).toEqual([3, 2, 1]);
    expect(arr).toBe(result);
  });

  it('자기 자신과 요소를 교환할 때 동일한 배열을 반환해야 합니다', () => {
    const arr = [1, 2, 3];
    const result = swap(arr, 1, 1);
    expect(result).toEqual([1, 2, 3]);
    expect(result).toBe(arr);
  });
});
