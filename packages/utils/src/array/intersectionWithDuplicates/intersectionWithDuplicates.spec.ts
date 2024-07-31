import { describe, it, expect } from 'vitest';
import { intersectionWithDuplicates } from '.';

describe('intersectionWithDuplicates', () => {
  it('should find the intersection of two arrays without duplicates', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [1, 2, 4, 5];

    expect(intersectionWithDuplicates(arr1, arr2)).toEqual([1, 2, 4]);
  });

  it('should find the intersection of two arrays and remove duplicates within each array', () => {
    const arr1 = [1, 1, 2, 2, 3, 4];
    const arr2 = [1, 2, 4, 4, 5, 5];

    expect(intersectionWithDuplicates(arr1, arr2)).toEqual([1, 1, 2, 2, 4]);
  });

  it('should use a custom comparator to find the intersection of two arrays of objects', () => {
    const arr1 = [
      { id: 1, name: 'john' },
      { id: 1, name: 'john' },
      { id: 2, name: 'gromit' },
    ];
    const arr2 = [
      { id: 1, name: 'john' },
      { id: 1, name: 'john' },
      { id: 3, name: 'dylan' },
    ];

    expect(intersectionWithDuplicates(arr1, arr2, (item) => item.id)).toEqual([
      { id: 1, name: 'john' },
      { id: 1, name: 'john' },
    ]);
  });
});
