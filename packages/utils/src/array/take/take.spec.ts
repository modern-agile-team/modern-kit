import { describe, it, expect } from 'vitest';
import { take } from '.';

describe('take', () => {
  it('should return first index when count is default', () => {
    const arr = [1, 2, 3];

    expect(take(arr)).toEqual([1]);
  });

  it('should return empty array when count is 0', () => {
    const arr = [1, 2, 3];

    expect(take(arr, 0)).toEqual([]);
  });

  it('should return correct array when count is positive number', () => {
    const arr = [1, 2, 3];

    expect(take(arr, 2)).toEqual([1, 2]);
  });

  it('should return empty array when count is negative number', () => {
    const arr = [1, 2, 3];

    expect(take(arr, -2)).toEqual([]);
  });

  it('should return origin array when count is greater than the length of array', () => {
    const arr = [1, 2, 3];

    expect(take(arr, 5)).toEqual([1, 2, 3]);
  });
});
