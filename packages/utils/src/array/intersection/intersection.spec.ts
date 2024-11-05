import { describe, it, expect } from 'vitest';
import { intersection } from '.';

describe('intersection', () => {
  it('두 배열의 교집합을 반환해야 합니다.', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [1, 2, 4, 5];

    expect(intersection(arr1, arr2)).toEqual([1, 2, 4]);
  });

  it('iteratee를 사용하여 두 객체 배열의 교집합을 찾아야 합니다.', () => {
    const arr1 = [
      { id: 1, name: 'john' },
      { id: 2, name: 'gromit' },
    ];
    const arr2 = [
      { id: 1, name: 'john' },
      { id: 3, name: 'dylan' },
    ];

    expect(intersection(arr1, arr2, (item) => item.id)).toEqual([
      { id: 1, name: 'john' },
    ]);
  });
});
