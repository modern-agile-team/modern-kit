import { describe, it, expect } from 'vitest';
import { at } from '.';

describe('at', () => {
  const arr = [10, 20, 30, 40, 50];

  it('should return the element at the given positive index', () => {
    expect(at(arr)).toBe(10);
    expect(at(arr, 0)).toBe(10);
    expect(at(arr, 2)).toBe(30);
    expect(at(arr, 4)).toBe(50);
  });

  it('should return the element from the end of the array for a negative index', () => {
    expect(at(arr, -1)).toBe(50);
    expect(at(arr, -3)).toBe(30);
    expect(at(arr, -5)).toBe(10);
  });

  it('should return undefined if the index is out of bounds', () => {
    expect(at(arr, 5)).toBeUndefined();
    expect(at(arr, -6)).toBeUndefined();
  });

  it('should return undefined for an empty array', () => {
    expect(at([], 0)).toBeUndefined();
    expect(at([], -1)).toBeUndefined();
  });
});
