import { describe, it, expect } from 'vitest';
import { shuffle } from '.';

describe('shuffle', () => {
  it('should shuffle an array of numbers', () => {
    const arr = [1, 2, 3, 4, 5];

    expect(shuffle(arr).slice().sort()).toEqual(arr.slice().sort());
  });

  it('should not modify the original array', () => {
    const arr = [1, 2, 3, 4, 5];
    const copiedArr = arr.slice();

    shuffle(arr);
    expect(arr).toEqual(copiedArr);
  });
});
