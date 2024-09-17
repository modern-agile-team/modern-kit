import { describe, it, expect } from 'vitest';
import { drop } from '.';

describe('drop', () => {
  it('should drop the first element of an array by default', () => {
    const arr = [1, 2, 3];
    const result = drop(arr);

    expect(result).toEqual([2, 3]);
  });

  it('should drop the first n elements of an array', () => {
    const arr = [1, 2, 3];
    const result = drop(arr, 2);

    expect(result).toEqual([3]);
  });

  it('should return an empty array if n is greater than the length of the array', () => {
    const arr = [1, 2, 3];
    const result = drop(arr, 4);

    expect(result).toEqual([]);
  });

  it('should return the same array if n is 0', () => {
    const arr = [1, 2, 3];
    const result = drop(arr, 0);

    expect(result).toEqual(arr);
  });

  it('should return origin array if n is negative number', () => {
    const arr = [1, 2, 3];
    const result = drop(arr, -1);

    expect(result).toEqual(arr);
  });
});
