import { describe, expect, it } from 'vitest';
import { deepCopy } from '.';

describe('deepCopy', () => {
  it('should deeply copy a primitive value', () => {
    const originNum = 42;
    const copyNum = deepCopy(originNum);

    expect(copyNum).toBe(originNum);
  });

  it('should deeply copy an array', () => {
    const originArray = [1, 2, [3, 4]];
    const copyArray = deepCopy(originArray);

    expect(copyArray).toEqual(originArray);
    expect(copyArray).not.toBe(originArray);
  });

  it('should deeply copy an object', () => {
    const originObj = { a: 1, b: { c: 2 } };
    const copyObj = deepCopy(originObj);

    expect(copyObj).toEqual(originObj);
    expect(copyObj).not.toBe(originObj);
  });

  it('should deeply copy a set', () => {
    const originSet = new Set([1, 2, 3]);
    const copySet = deepCopy(originSet);

    expect(copySet).toEqual(originSet);
    expect(copySet).not.toBe(originSet);
  });

  it('should deeply copy a map', () => {
    const originMap = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const copyMap = deepCopy(originMap);

    expect(copyMap).toEqual(originMap);
    expect(copyMap).not.toBe(originMap);
  });
});
