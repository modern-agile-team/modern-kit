import { describe, it, expect } from 'vitest';
import { union } from '.';

describe('union', () => {
  it('두 배열을 결합하고, 중복을 제거한 배열을 반환해야 합니다.', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [1, 2, 4, 5];
    const unionArray = union(arr1, arr2);

    expect(unionArray).toEqual([1, 2, 3, 4, 5]);
  });

  it('iteratee 결과를 기반으로 중복 요소를 판단 할 수 있어야 합니다.', () => {
    const arr1 = [
      { id: 1, name: 'john' },
      { id: 2, name: 'jane' },
    ];
    const arr2 = [
      { id: 1, name: 'john' },
      { id: 3, name: 'gromit' },
    ];

    expect(union(arr1, arr2, (item) => item.id)).toEqual([
      { id: 1, name: 'john' },
      { id: 2, name: 'jane' },
      { id: 3, name: 'gromit' },
    ]);
  });
});
