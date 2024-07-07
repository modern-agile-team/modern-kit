import { isSubset } from '.';

describe('isSubset', () => {
  it('if the childArray is a subset of the parentArray', () => {
    const parentArray = [1, 2, 3, 4];
    const childArray1 = [1, 3];
    const childArray2 = [1, 5];

    expect(isSubset(parentArray, childArray1)).toBeTruthy();
    expect(isSubset(parentArray, childArray2)).toBeFalsy();
  });

  it('if the type is dfferent between comparison elements', () => {
    const parentArray = ['1', 2, 3, 4];
    const childArray1 = ['1', 2, 3];
    const childArray2 = [1, '2', 3];

    expect(isSubset(parentArray, childArray1)).toBeTruthy();
    expect(isSubset(parentArray, childArray2)).toBeFalsy();
    expect(isSubset(parentArray, childArray2, (el) => Number(el))).toBeTruthy();
  });

  it('if elements type is array', () => {
    const parentArray = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
    ];
    const childArray = [[0, 1, 7, 4, 9]];

    expect(isSubset(parentArray, childArray)).toBeFalsy();
    expect(isSubset(parentArray, childArray, (obj) => obj[2])).toBeTruthy(); // [2,7], [7];
    expect(isSubset(parentArray, childArray, (obj) => obj[3])).toBeFalsy(); // [3,8], [4]
  });

  it('if elements type is reference', () => {
    const parentArray = [
      {
        name: 'Peter',
        age: 13,
      },
      {
        name: 'Aimee',
        age: 25,
      },
    ];

    const childArray1 = [
      {
        name: 'Aimee',
        age: 25,
      },
    ];

    const childArray2 = [
      {
        name: 'Peter',
        age: 15,
      },
    ];

    expect(isSubset(parentArray, childArray1)).toBeFalsy();
    expect(
      isSubset(parentArray, childArray1, (obj) => JSON.stringify(obj))
    ).toBeTruthy();
    expect(
      isSubset(parentArray, childArray2, (obj) => JSON.stringify(obj))
    ).toBeFalsy();
    expect(isSubset(parentArray, childArray2, (obj) => obj.name)).toBeTruthy();
  });
});
