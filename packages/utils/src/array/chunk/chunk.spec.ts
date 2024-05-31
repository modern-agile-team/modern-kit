import { chunk } from '../chunk';

describe('chunk', () => {
  it('splits the array according to the second parameter', () => {
    const arr1 = [1, 2, 3, 4, 5, 6];
    expect(chunk(arr1, 1)).toEqual([[1], [2], [3], [4], [5], [6]]);
    expect(chunk(arr1, 2)).toEqual([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);

    const arr2 = [1, 2, 3, 4, 5];
    expect(chunk(arr2, 3)).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });

  it('returns an array of each element when the second parameter is 1', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(chunk(arr, 1)).toEqual([[1], [2], [3], [4], [5], [6]]);
  });

  it('returns an empty array when given an empty array', () => {
    const arr = [] as [];
    expect(chunk(arr, 3)).toEqual([]);
  });

  it('returns the array as is if the chunk size is greater than the length of the array', () => {
    const arr = [1, 2];
    expect(chunk(arr, 3)).toEqual([arr]);
  });

  it('returns an empty array if the second parameter is 0', () => {
    const arr = [1, 2];
    expect(chunk(arr, 0 as number)).toEqual([]);
  });
});
