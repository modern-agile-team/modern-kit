import { describe, it, expect } from 'vitest';
import { uniq } from '.';

describe('uniq', () => {
  it('중복이 없는 경우 동일한 배열을 반환해야 합니다.', () => {
    const testArr = [1, 2, 3];
    const expectedArray = [1, 2, 3];

    expect(uniq(testArr)).toEqual(expectedArray);
  });

  it('중복 요소가 제거된 배열을 반환해야 합니다.', () => {
    const testArr = [1, 2, 2, 'a', 2, 'a', 3];
    const expectedArray = [1, 2, 'a', 3];

    expect(uniq(testArr)).toEqual(expectedArray);
  });

  it('iteratee 결과를 기반으로 중복 요소를 판단 할 수 있어야 합니다.(Nested Array)', () => {
    const testArr = [
      ['a', 'b', 'c'],
      ['a', 'b', 'c'],
      ['a', 'b', 'c'],
    ];
    const expectedArray = [['a', 'b', 'c']];

    expect(uniq(testArr, (item) => JSON.stringify(item))).toEqual(
      expectedArray
    );
  });

  it('iteratee 결과를 기반으로 중복 요소를 판단 할 수 있어야 합니다.(Object)', () => {
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

    expect(uniq(testArr, (item) => item.id)).toEqual(expectedArray);
  });
});
