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

  it('if elements type is array', () => {
    const parentArray = [
      [0, 1, 2, 3, 4],
      [2, 3, 4, 5, 6],
    ];
    const childArray1 = [[0, 1, 2, 3, 4]];
    const childArray2 = [[2, 3, 4, 5]];

    expect(isSubset(parentArray, childArray1)).toBeTruthy();
    expect(isSubset(parentArray, childArray2)).toBeFalsy();
    expect(isSubset(parentArray, childArray1, (obj) => obj[0])).toBeTruthy();
    expect(isSubset(parentArray, childArray2, (obj) => obj[0])).toBeTruthy();
  });

  it('if elements type is reference', () => {
    type user = {
      name: string;
      age: number;
      bestFriend: {
        name: string;
        age: number;
      };
      friends: string[];
    };

    const parentArray: user[] = [
      {
        name: 'Peter',
        age: 13,
        bestFriend: {
          name: 'Aimee',
          age: 25,
        },
        friends: ['Charlie', 'Chuck', 'Catherine'],
      },
      {
        name: 'Aimee',
        age: 25,
        bestFriend: {
          name: 'Charlie',
          age: 19,
        },
        friends: ['Peter', 'Chuck', 'Catherine'],
      },
    ];

    // parentArray[1] 과 동일 요소를 가짐.
    const childArray1: user[] = [
      {
        name: 'Aimee',
        age: 25,
        bestFriend: {
          name: 'Charlie',
          age: 19,
        },
        friends: ['Peter', 'Chuck', 'Catherine'],
      },
    ];

    // parentArray[0]의 friends의 마지막 요소가 다름.
    const childArray2: user[] = [
      {
        name: 'Peter',
        age: 13,
        bestFriend: {
          name: 'Aimee',
          age: 25,
        },
        friends: ['Charlie', 'Chuck', 'bell'],
      },
    ];

    expect(isSubset(parentArray, childArray1)).toBeTruthy();
    expect(isSubset(parentArray, childArray2)).toBeFalsy();
    expect(
      isSubset(parentArray, childArray2, (obj: user) => {
        return {
          name: obj.name,
          bestFriend: obj.bestFriend,
        };
      })
    ).toBeTruthy();
  });
});
