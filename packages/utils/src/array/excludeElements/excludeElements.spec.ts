import { describe, it, expect } from 'vitest';
import { excludeElements } from '.';

describe('excludeElements', () => {
  it('target 배열의 요소를 제외한 배열을 반환해야 합니다.', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const target = [1, 3];

    expect(excludeElements(array, target)).toEqual([2, 4, 5, 6]);
  });

  it('iteratee 함수 결과에 따른 target 배열의 요소를 제외한 배열을 반환해야 합니다.', () => {
    const array1 = [
      { name: 'kim', address: 'Seoul' },
      { name: 'lee', address: 'NewYork' },
      { name: 'kim', address: 'Tokyo' },
    ];
    const target1 = [{ name: 'kim', address: 'Seoul' }];

    expect(excludeElements(array1, target1, (item) => item.name)).toEqual([
      { name: 'lee', address: 'NewYork' },
    ]);

    const array2 = [
      [3, 'a'],
      [4, 'b'],
      [3, 'c'],
    ];
    const target2 = [[3, 'a']];

    expect(excludeElements(array2, target2, (item) => item[0])).toEqual([
      [4, 'b'],
    ]);
  });
});
