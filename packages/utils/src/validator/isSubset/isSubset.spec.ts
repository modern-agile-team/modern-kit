import { isSubset } from '.';

describe('isSubset', () => {
  it('should correctly determine if the subset arrays are subsets of the superset array', () => {
    const superset = [1, 2, 3, 4];
    const subset1 = [1, 3];
    const subset2 = [1, 5];

    expect(isSubset(superset, subset1)).toBeTruthy();
    expect(isSubset(superset, subset2)).toBeFalsy();
  });

  it('should return the correct result if the types are different between comparison elements', () => {
    const superset = ['1', 2, 3, 4];
    const subset1 = ['1', 2, 3];
    const subset2 = [1, '2', 3];

    expect(isSubset(superset, subset1)).toBeTruthy();
    expect(isSubset(superset, subset2)).toBeFalsy();
    expect(isSubset(superset, subset2, (el) => Number(el))).toBeTruthy();
  });

  it('should handle elements of type array correctly', () => {
    const superset = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
    ];
    const subset = [[0, 1, 7, 4, 9]];

    expect(isSubset(superset, subset)).toBeFalsy();
    expect(isSubset(superset, subset, (arr) => arr[2])).toBeTruthy(); // [2,7], [7];
    expect(isSubset(superset, subset, (arr) => arr[3])).toBeFalsy(); // [3,8], [4]
  });

  it('should handle elements of type reference correctly', () => {
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
