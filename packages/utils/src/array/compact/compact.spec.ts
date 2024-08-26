import { describe, it, expect } from 'vitest';
import { compact } from '.';

describe('compact', () => {
  it('should remove all falsy values (0, false, null, undefined, NaN, "") from an array', () => {
    const arr = [0, 1, false, 2, '', 3, null, undefined, 4, NaN, 5] as const;
    expect(compact(arr)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return an empty array when all input values are falsy', () => {
    const arr = [false, null, undefined, '', 0, NaN] as const;
    expect(compact(arr)).toEqual([]);
  });

  it('should return an identical array when no falsy values are present', () => {
    const arr = [1, 'apple', true, {}, []] as const;
    expect(compact(arr)).toEqual([1, 'apple', true, {}, []]);
  });

  it('should correctly handle arrays with mixed types', () => {
    const arr = [1, 'test', false, { three: 3 }, null, [4], undefined] as const;
    expect(compact(arr)).toEqual([1, 'test', { three: 3 }, [4]]);
  });

  it('should not mutate the original array', () => {
    const original = [1, null, 2, undefined, 3] as const;
    const result = compact(original);
    expect(result).toEqual([1, 2, 3]);
    expect(original).toEqual([1, null, 2, undefined, 3]);
  });

  it('should return an empty array when given an empty array input', () => {
    const emptyArr: readonly [] = [];
    expect(compact(emptyArr)).toEqual([]);
  });
});
