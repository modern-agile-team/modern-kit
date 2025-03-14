import { describe, it, expect } from 'vitest';
import { mapRight } from '.';

type CallbackResult<T, U> = {
  value: T;
  index: number;
  array: T[] | readonly T[];
  result: U;
};

describe('mapRight', () => {
  it('배열에서 오른쪽에서 왼쪽으로 값을 매핑해야 합니다', () => {
    const arr = [1, 2, 3];
    const callbackResults: CallbackResult<number, number>[] = [];
    const result = mapRight(arr, (value, index = 0, array = []) => {
      callbackResults.push({ value, index, array, result: value });
      return value;
    });

    const expectedResults = [
      { value: 3, index: 2, array: arr, result: 3 },
      { value: 2, index: 1, array: arr, result: 2 },
      { value: 1, index: 0, array: arr, result: 1 },
    ];
    const expectedMappedArray = [3, 2, 1];

    expect(callbackResults).toEqual(expectedResults);
    expect(result).toEqual(expectedMappedArray);
  });

  it('빈 배열을 올바르게 처리해야 합니다', () => {
    const emptyArray: number[] = [];
    const callbackResults: CallbackResult<number, number>[] = [];
    const result = mapRight(emptyArray, (value, index = 0, array = []) => {
      callbackResults.push({ value, index, array, result: value });
      return value;
    });

    expect(callbackResults).toEqual([]);
    expect(result).toEqual([]);
  });

  it('요소가 하나인 배열을 올바르게 처리해야 합니다', () => {
    const arr = [1];
    const callbackResults: CallbackResult<number, number>[] = [];
    const result = mapRight(arr, (value, index = 0, array = []) => {
      callbackResults.push({ value, index, array, result: value });
      return value;
    });

    const expectedResults = [{ value: 1, index: 0, array: arr, result: 1 }];
    const expectedMappedArray = [1];

    expect(callbackResults).toEqual(expectedResults);
    expect(result).toEqual(expectedMappedArray);
  });
});
