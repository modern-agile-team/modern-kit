import { describe, it, expect } from 'vitest';
import { isSubset } from '.';

describe('isSubset', () => {
  it('부분집합 배열이 상위집합 배열의 부분집합인지 올바르게 판단해야 합니다.', () => {
    const superset = [1, 2, 3, 4];
    const subset1 = [1, 3];
    const subset2 = [1, 5];

    expect(isSubset(superset, subset1)).toBeTruthy();
    expect(isSubset(superset, subset2)).toBeFalsy();
  });

  it('비교 요소 간의 타입이 다른 경우 올바른 결과를 반환해야 합니다.', () => {
    const superset = ['1', 2, 3, 4];
    const subset1 = ['1', 2, 3];
    const subset2 = [1, '2', 3];

    expect(isSubset(superset, subset1)).toBeTruthy();
    expect(isSubset(superset, subset2)).toBeFalsy();
    expect(isSubset(superset, subset2, (el) => Number(el))).toBeTruthy();
  });

  it('배열 타입의 요소를 올바르게 처리해야 합니다.', () => {
    const superset = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
    ];
    const subset = [[0, 1, 7, 4, 9]];

    expect(isSubset(superset, subset)).toBeFalsy();
    expect(isSubset(superset, subset, (arr) => arr[2])).toBeTruthy(); // [2,7], [7];
    expect(isSubset(superset, subset, (arr) => arr[3])).toBeFalsy(); // [3,8], [4]
  });

  it('참조 타입의 요소를 올바르게 처리해야 합니다.', () => {
    const superset = [
      {
        name: 'Peter',
        age: 13,
      },
      {
        name: 'Aimee',
        age: 25,
      },
    ];

    const subset1 = [
      {
        name: 'Aimee',
        age: 25,
      },
    ];

    const subset2 = [
      {
        name: 'Peter',
        age: 15,
      },
    ];

    expect(isSubset(superset, subset1)).toBeFalsy();
    expect(
      isSubset(superset, subset1, (obj) => JSON.stringify(obj))
    ).toBeTruthy();
    expect(
      isSubset(superset, subset2, (obj) => JSON.stringify(obj))
    ).toBeFalsy();
    expect(isSubset(superset, subset2, (obj) => obj.name)).toBeTruthy();
  });
});
