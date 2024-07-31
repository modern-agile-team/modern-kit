import { describe, it, expect } from 'vitest';
import { forEachRight } from '.';

type CallbackResult = {
  value: number;
  index: number;
  array: number[] | readonly number[];
};

describe('forEachRight', () => {
  it('should call the callback for each element from right to left', () => {
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

  it('should not modify the original array', () => {
    const originalArray = [1, 2, 3];
    forEachRight(originalArray, () => {});
    expect(originalArray).toEqual([1, 2, 3]);
  });

  it('should handle empty arrays without producing results and not modify the original array', () => {
    const emptyArray: number[] = [];
    const callbackResults: CallbackResult[] = [];

    forEachRight(emptyArray, (value, index, array) => {
      callbackResults.push({ value, index, array });
    });

    expect(callbackResults).toEqual([]);
    expect(emptyArray).toEqual([]);
  });
});
