import { describe, it, expect } from 'vitest';
import { uniq } from '.';

describe('uniq', () => {
  it('should return the same array if there are no duplicates', () => {
    const testArr = [1, 2, 3];
    const expectedArray = [1, 2, 3];

    expect(uniq(testArr)).toEqual(expectedArray);
  });

  it('should return an array with duplicates removed', () => {
    const testArr = [1, 2, 2, 'a', 2, 'a', 3];
    const expectedArray = [1, 2, 'a', 3];

    expect(uniq(testArr)).toEqual(expectedArray);
  });

  it('should be able to determine duplicate elements based on the results of the iteratee(Array)', () => {
    const testArr = [1, 2, 2.1, 2.2, 2.3, 3];
    const expectedArray = [1, 2, 3];

    expect(uniq(testArr, (item) => Math.floor(item))).toEqual(expectedArray);
  });

  it('should be able to determine duplicate elements based on the results of the iteratee(Nested Array)', () => {
    const testArr = [
      ['a', 'b', 'c'],
      ['a', 'b', 'c'],
      ['a', 'b', 'c'],
    ];
    const expectedArray = [['a', 'b', 'c']];

    expect(uniq(testArr)).toEqual(testArr); // no iteratee
    expect(uniq(testArr, (item) => JSON.stringify(item))).toEqual(
      expectedArray
    );
  });

  it('should be able to determine duplicate elements based on the results of the iteratee(Object)', () => {
    const testArr = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 1, name: 'John' },
      { id: 3, name: 'gromit' },
      { id: 3, name: 'gromit' },
    ];
    const expectedArray = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'gromit' },
    ];

    expect(uniq(testArr)).toEqual(testArr); // no iteratee
    expect(uniq(testArr, (item) => item.id)).toEqual(expectedArray);
  });
});
