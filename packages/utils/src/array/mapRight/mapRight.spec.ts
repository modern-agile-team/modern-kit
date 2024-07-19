import { mapRight } from '.';

type CallbackResult<T, U> = {
  value: T;
  index: number;
  array: T[] | readonly T[];
  result: U;
};
describe('mapRight', () => {
  it('should map values from right to left in an array', () => {
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

  it('should handle empty arrays correctly', () => {
    const emptyArray: number[] = [];
    const callbackResults: CallbackResult<number, number>[] = [];
    const result = mapRight(emptyArray, (value, index = 0, array = []) => {
      callbackResults.push({ value, index, array, result: value });
      return value;
    });

    expect(callbackResults).toEqual([]);
    expect(result).toEqual([]);
  });

  it('should handle arrays with one element correctly', () => {
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
