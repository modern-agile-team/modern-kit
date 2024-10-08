import { describe, it, expect } from 'vitest';
import { xor } from './';

describe('xor', () => {
  it('should return an empty array when both input arrays are empty', () => {
    expect(xor([], [])).toEqual([]);
  });

  it('should return all elements when one array is empty', () => {
    expect(xor([1, 2, 3], [])).toEqual([1, 2, 3]);
    expect(xor([], [1, 2, 3])).toEqual([1, 2, 3]);
  });
  it('should return the symmetric difference of two arrays', () => {
    expect(xor([1, 2, 3], [2, 3, 4])).toEqual([1, 4]);
  });

  it('should work with string arrays', () => {
    expect(xor(['a', 'b', 'c'], ['b', 'c', 'd'])).toEqual(['a', 'd']);
  });

  it('should work with object arrays using iteratee function', () => {
    const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const arr2 = [{ id: 2 }, { id: 3 }, { id: 4 }];
    expect(xor(arr1, arr2, (item) => item.id)).toEqual([{ id: 1 }, { id: 4 }]);
  });

  it('should return an empty array when both arrays are identical', () => {
    expect(xor([1, 2, 3], [1, 2, 3])).toEqual([]);
  });
});
