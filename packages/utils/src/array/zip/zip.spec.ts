import { describe, it, expect } from 'vitest';
import { zip } from '.';

describe('zip', () => {
  it('여러 배열을 튜플로 묶습니다', () => {
    const arr1 = [1, 2, 3];
    const arr2 = ['a', 'b', 'c'];
    const arr3 = [true, false, true];
    const arr4 = [null, null];

    expect(zip(arr1)).toEqual([[1], [2], [3]]);
    expect(zip(arr1, arr2)).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
    expect(zip(arr1, arr2, arr3)).toEqual([
      [1, 'a', true],
      [2, 'b', false],
      [3, 'c', true],
    ]);
    expect(zip(arr1, arr2, arr3, arr4)).toEqual([
      [1, 'a', true, null],
      [2, 'b', false, null],
      [3, 'c', true, undefined],
    ]);
  });
});
