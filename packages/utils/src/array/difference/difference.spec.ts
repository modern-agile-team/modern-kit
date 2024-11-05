import { describe, it, expect } from 'vitest';
import { difference } from '.';

describe('difference', () => {
  it('첫 번째 배열을 기준으로 두 배열의 차이가 있는 배열을 반환해야 합니다.', () => {
    const arr1 = [1, 2, 3, 4];
    const arr2 = [1, 2, 4, 5];

    expect(difference(arr1, arr2)).toEqual([3]);
  });

  it('iteratee를 사용하여 두 객체 배열의 차이를 찾아야 합니다.', () => {
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
