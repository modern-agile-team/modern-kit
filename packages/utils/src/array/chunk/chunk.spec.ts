import { chunk } from '../chunk';

describe('chunk', () => {
  test('배열을 2번째 매개변수만큼 자른다.', () => {
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

  test('2번째 매개변수가 1일 때 각 요소의 배열을 반환합니다', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    expect(chunk(arr, 1)).toEqual([[1], [2], [3], [4], [5], [6]]);
  });

  test('빈 배열이 주어지는 경우 빈 배열을 반환한다.', () => {
    const arr = [] as [];
    expect(chunk(arr, 3)).toEqual([]);
  });

  test('배열의 길이보다 크게 자르는 경우 배열을 그대로 담아 반환한다.', () => {
    const arr = [1, 2];
    expect(chunk(arr, 3)).toEqual([arr]);
  });
});
