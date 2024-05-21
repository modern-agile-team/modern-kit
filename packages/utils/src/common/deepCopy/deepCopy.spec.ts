import { deepCopy } from '.';

describe('deepCopy', () => {
  it('should deeply copy a primitive value', () => {
    const originNum = 42;
    const copiedNum = deepCopy(originNum);

    expect(copiedNum).toBe(originNum);
  });

  it('should deeply copy an object', () => {
    const originObj = { a: 1, b: { c: 2 } };
    const copiedObj = deepCopy(originObj);

    expect(copiedObj).toEqual(originObj);
    expect(copiedObj).not.toBe(originObj);
  });

  it('should deeply copy a set', () => {
    const originSet = new Set([1, 2, 3]);
    const copiedSet = deepCopy(originSet);

    expect(copiedSet).toEqual(originSet);
    expect(copiedSet).not.toBe(originSet);
  });

  it('should deeply copy a map', () => {
    const originMap = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const copiedMap = deepCopy(originMap);

    expect(copiedMap).toEqual(originMap);
    expect(copiedMap).not.toBe(originMap);
  });
});
