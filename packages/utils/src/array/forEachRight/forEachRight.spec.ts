import { describe, it, expect } from 'vitest';
import { forEachRight } from '.';

type CallbackResult = {
  value: number;
  index: number;
  array: number[] | readonly number[];
};

describe('forEachRight', () => {
  it('callback을 오른쪽에서 왼쪽으로 각 요소에 대해 호출해야 합니다', () => {
    const callbackResults: CallbackResult[] = [];

    forEachRight([1, 2, 3], (value, index, array) => {
      callbackResults.push({ value, index, array });
    });

    const expected = [
      { value: 3, index: 2, array: [1, 2, 3] },
      { value: 2, index: 1, array: [1, 2, 3] },
      { value: 1, index: 0, array: [1, 2, 3] },
    ];

    expect(callbackResults).toEqual(expected);
  });

  it('원래 배열을 수정하지 않아야 합니다', () => {
    const originalArray = [1, 2, 3];
    forEachRight(originalArray, () => {});
    expect(originalArray).toEqual([1, 2, 3]);
  });

  it('빈 배열을 처리할 때 결과를 생성하지 않고 원래 배열을 수정하지 않아야 합니다', () => {
    const emptyArray: number[] = [];
    const callbackResults: CallbackResult[] = [];

    forEachRight(emptyArray, (value, index, array) => {
      callbackResults.push({ value, index, array });
    });

    expect(callbackResults).toEqual([]);
    expect(emptyArray).toEqual([]);
  });
});
