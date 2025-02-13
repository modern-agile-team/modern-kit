import { describe, it, expect } from 'vitest';
import { flatten } from '.';

describe('flatten', () => {
  const originArr = [1, [2, [3, [4]]]];

  it('기본 깊이 1로 배열을 평탄화해야 합니다.', () => {
    const expectedArr = [1, 2, [3, [4]]];

    expect(flatten(originArr)).toEqual(expectedArr);
    expect(originArr.flat()).toEqual(expectedArr);
  });

  it('지정된 깊이로 깊게 중첩된 배열을 평탄화해야 합니다.', () => {
    const expectedArr1 = [1, 2, [3, [4]]];
    expect(flatten(originArr, 1)).toEqual(expectedArr1);
    expect(originArr.flat(1)).toEqual(expectedArr1);

    const expectedArr2 = [1, 2, 3, [4]];
    expect(flatten(originArr, 2)).toEqual(expectedArr2);
    expect(originArr.flat(2)).toEqual(expectedArr2);

    const expectedArr3 = [1, 2, 3, 4];
    expect(flatten(originArr, 3)).toEqual(expectedArr3);
    expect(originArr.flat(3)).toEqual(expectedArr3);
  });

  it('깊이가 0이거나 NaN이거나 음수인 경우 동일한 배열을 반환해야 합니다.', () => {
    const expectedArr = [1, [2, [3, [4]]]];

    expect(flatten(originArr, 0)).toEqual(expectedArr);
    expect(originArr.flat(0)).toEqual(expectedArr);

    expect(flatten(originArr, NaN)).toEqual(expectedArr);
    expect(originArr.flat(NaN)).toEqual(expectedArr);

    expect(flatten(originArr, -1)).toEqual(expectedArr);
    expect(originArr.flat(-1)).toEqual(expectedArr);
  });

  it('부동 소수점 값을 고려하여 지정된 깊이로 배열을 평탄화해야 합니다.', () => {
    const expectedArr1 = [1, 2, [3, [4]]];
    expect(flatten(originArr, 1.5)).toEqual(expectedArr1);
    expect(originArr.flat(1.3)).toEqual(expectedArr1);

    const expectedArr2 = [1, 2, 3, [4]];
    expect(flatten(originArr, 2.5)).toEqual(expectedArr2);
    expect(originArr.flat(2.5)).toEqual(expectedArr2);
  });

  it('빈 배열을 처리해야 합니다.', () => {
    const originArr: number[] = [];

    expect(flatten(originArr, 2)).toEqual([]);
  });
});
