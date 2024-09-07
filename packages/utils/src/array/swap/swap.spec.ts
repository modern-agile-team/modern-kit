import { describe, it, expect } from 'vitest';
import { swap } from '.';

describe('swap', () => {
  it('should swap elements in a array', () => {
    const arr = [1, 2, 3];
    const result = swap(arr, 0, 2);
    expect(result).toEqual([3, 2, 1]);
    expect(arr).toEqual([3, 2, 1]);
  });

  it('should swap elements in an immutable way when specified', () => {
    const arr = [1, 2, 3];
    const result = swap(arr, 0, 2, { immutable: true });
    expect(result).toEqual([3, 2, 1]);
    expect(arr).toEqual([1, 2, 3]);
  });

  it('should swap elements in a mutable way when specified', () => {
    const arr = [1, 2, 3];
    const result = swap(arr, 0, 2, { immutable: false });
    expect(result).toEqual([3, 2, 1]);
    expect(arr).toEqual([3, 2, 1]);
  });

  it('should handle swapping elements in a larger array', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7];
    const result = swap(arr, 1, 5);
    expect(result).toEqual([1, 6, 3, 4, 5, 2, 7]);
    expect(arr).toEqual([1, 6, 3, 4, 5, 2, 7]);
  });

  it('should return the same array if swapping an element with itself', () => {
    const arr = [1, 2, 3];
    const result = swap(arr, 1, 1);
    expect(result).toEqual([1, 2, 3]);
    expect(result).toBe(arr);
  });
});
