import { describe, it, expect } from 'vitest';
import { swap } from '.';

describe('swap', () => {
  it('should swap elements in a array', () => {
    const arr = [1, 2, 3];
    const result = swap(arr, 0, 2);
    
    expect(result).toEqual([3, 2, 1]);
    expect(arr).toBe(result);
  });

  it('should swap elements in an immutable way when specified', () => {
    const arr = [1, 2, 3];
    const result = swap(arr, 0, 2, { immutable: true });
    
    expect(result).toEqual([3, 2, 1]);
    expect(arr).not.toBe(result);
  });

  it('should swap elements in a mutable way when specified', () => {
    const arr = [1, 2, 3];
    const result = swap(arr, 0, 2, { immutable: false });
    
    expect(result).toEqual([3, 2, 1]);
    expect(arr).toBe(result);
  });

  it('should return the same array if swapping an element with itself', () => {
    const arr = [1, 2, 3];
    const result = swap(arr, 1, 1);
    expect(result).toEqual([1, 2, 3]);
    expect(result).toBe(arr);
  });
});
