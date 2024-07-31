import { describe, it, expect } from 'vitest';
import { chunk } from '../chunk';

describe('chunk', () => {
  it('should split the array according to the size parameter', () => {
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

  it('should return an array of each element when the size parameter is 1', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(chunk(arr, 1)).toEqual([[1], [2], [3], [4], [5], [6]]);
  });

  it('should return an empty array when given an empty array', () => {
    const arr = [] as [];
    expect(chunk(arr, 3)).toEqual([]);
  });

  it('should return the array as is if the size parameter is greater than the length of the array', () => {
    const arr = [1, 2];
    expect(chunk(arr, 3)).toEqual([arr]);
  });

  it('should throw an error if the size parameter is invalid', () => {
    const arr = [1, 2];

    expect(() => chunk(arr, NaN)).toThrowError();
    expect(() => chunk(arr, 0)).toThrowError();
    expect(() => chunk(arr, 1.5)).toThrowError();
  });
});
