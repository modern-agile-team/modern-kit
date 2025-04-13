import { describe, it, expect } from 'vitest';
import { cloneDeep } from '.';

describe('cloneDeep', () => {
  it('원시값을 깊게 복사해야 합니다', () => {
    const originNum = 42;
    const copiedNum = cloneDeep(originNum);

    expect(copiedNum).toBe(originNum);
  });

  it('배열을 깊게 복사해야 합니다', () => {
    const originArray = [1, 2, [3, 4]];
    const copiedArray = cloneDeep(originArray);

    expect(copiedArray).toEqual(originArray);
    expect(copiedArray).not.toBe(originArray);
  });

  it('배열의 순환 참조도 깊게 복사해야 합니다', () => {
    const originArray: any[] = [];
    originArray.push(originArray);

    const copiedArr = cloneDeep(originArray);

    expect(copiedArr).toEqual(copiedArr[0]);
    expect(copiedArr).not.toBe(originArray);
    expect(copiedArr).not.toBe(originArray[0]);
  });

  it('객체의 순환 참조도 깊게 복사해야 합니다', () => {
    const originObject = { origin: {} };
    originObject.origin = originObject;

    const copiedObject = cloneDeep(originObject);

    expect(copiedObject).toEqual(copiedObject.origin);
    expect(copiedObject).not.toBe(originObject);
    expect(copiedObject).not.toBe(originObject.origin);
  });

  it('객체를 깊게 복사해야 합니다', () => {
    const originObj = { a: 1, b: { c: 2, d: [0, 1] } };
    const copiedObj = cloneDeep(originObj);

    expect(copiedObj).toEqual(originObj);
    expect(copiedObj).not.toBe(originObj);
    expect(copiedObj.b.d).not.toBe(originObj.b.d);
  });

  it('Set을 깊게 복사해야 합니다', () => {
    const originSet = new Set([1, 2, 3]);
    const copiedSet = cloneDeep(originSet);

    expect(copiedSet).toEqual(originSet);
    expect(copiedSet).not.toBe(originSet);
  });

  it('Map을 깊게 복사해야 합니다', () => {
    const originMap = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const copiedMap = cloneDeep(originMap);

    expect(copiedMap).toEqual(originMap);
    expect(copiedMap).not.toBe(originMap);
  });

  it('Date를 깊게 복사해야 합니다', () => {
    const date = new Date();
    const copiedDate = cloneDeep(date);

    expect(copiedDate.getTime()).toEqual(date.getTime());
    expect(copiedDate).not.toBe(date);
  });

  it('정규식을 깊게 복사해야 합니다', () => {
    const regex = /test/gi;
    const copiedRegex = cloneDeep(regex);

    expect(copiedRegex.source).toEqual(regex.source);
    expect(copiedRegex.flags).toEqual(regex.flags);
    expect(copiedRegex).not.toBe(regex);
  });
});
