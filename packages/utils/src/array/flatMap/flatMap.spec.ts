import { describe, expect, it } from 'vitest';
import { flatMap } from '.';

describe('flatMap', () => {
  const originArr = [1, 2, 3];

  it('기본 깊이로 숫자 배열을 매핑하고 평탄화해야 합니다.', () => {
    const iteratee = (item: number) => [item, item];
    const expectedArr = [1, 1, 2, 2, 3, 3];

    expect(flatMap(originArr, iteratee)).toEqual(expectedArr);
  });

  it('지정된 깊이로 숫자 배열을 매핑하고 평탄화해야 합니다.', () => {
    const iteratee = (item: number) => [[[item, item]]];

    const expectedArr1 = [[[1, 1]], [[2, 2]], [[3, 3]]];
    expect(flatMap(originArr, iteratee, 1)).toEqual(expectedArr1);

    const expectedArr2 = [
      [1, 1],
      [2, 2],
      [3, 3],
    ];
    expect(flatMap(originArr, iteratee, 2)).toEqual(expectedArr2);

    const expectedArr3 = [1, 1, 2, 2, 3, 3];
    expect(flatMap(originArr, iteratee, 3)).toEqual(expectedArr3);
  });

  it('빈 배열을 처리해야 합니다.', () => {
    const emptyArr: number[] = [];
    const result = flatMap(emptyArr, (item) => [item, item]);
    expect(result).toEqual([]);
  });
});
