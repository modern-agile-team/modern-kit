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
        name: 'Peter',
        age: 13,
      },
    ];
    const childArray2 = [
      {
        name: 'Aimee',
        age: 13,
      },
    ];

    expect(isSubset(parentArray, childArray1)).toBeFalsy();
    expect(
      isSubset(parentArray, childArray1, (obj) => JSON.stringify(obj))
    ).toBeTruthy();
    expect(
      isSubset(parentArray, childArray2, (obj) => JSON.stringify(obj))
    ).toBeFalsy();
    expect(isSubset(parentArray, childArray2, (obj) => obj.name)).toBeTruthy(); // 이름만 비교
    expect(isSubset(parentArray, childArray2, (obj) => obj.age)).toBeTruthy(); // 나이만 비교
  });
});
