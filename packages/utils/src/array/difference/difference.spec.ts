import { describe, it, expect } from 'vitest';
import { difference } from '.';

describe('difference', () => {
  it('should return an array with the difference between two arrays', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [1, 2, 4, 5];

    expect(difference(arr1, arr2)).toEqual([3]);
  });

  it('should use a custom comparator to find the difference of two arrays of objects', () => {
    const arr1 = [
      { id: 1, name: 'john' },
      { id: 2, name: 'gromit' },
    ];
    const arr2 = [
      { id: 1, name: 'john' },
      { id: 3, name: 'dylan' },
    ];

    expect(difference(arr1, arr2, (item) => item.id)).toEqual([
      { id: 2, name: 'gromit' },
    ]);
  });
});
