import { describe, it, expect } from 'vitest';
import { shuffle } from '.';

describe('shuffle', () => {
  it('숫자 배열을 섞어야 합니다', () => {
    const arr = [1, 2, 3, 4, 5];

    expect(shuffle(arr).slice().sort()).toEqual(arr.slice().sort());
  });

  it('원래 배열을 수정하지 않아야 합니다', () => {
    const arr = [1, 2, 3, 4, 5];
    const copiedArr = arr.slice();

    shuffle(arr);
    expect(arr).toEqual(copiedArr);
  });
});
