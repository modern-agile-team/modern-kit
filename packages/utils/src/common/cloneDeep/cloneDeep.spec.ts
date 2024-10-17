import { describe, it, expect } from 'vitest';
import { cloneDeep } from '.';

describe('cloneDeep', () => {
  it('should deeply copy a primitive value', () => {
    const originNum = 42;
    const copiedNum = cloneDeep(originNum);

    expect(copiedNum).toBe(originNum);
  });

  it('should deeply copy an array', () => {
    const originArray = [1, 2, [3, 4]];
    const copiedArray = cloneDeep(originArray);

    expect(copiedArray).toEqual(originArray);
    expect(copiedArray).not.toBe(originArray);
  });

  it('should also copy the array circular references deeply.', () => {
    const originArray: any[] = [];
    originArray.push(originArray);

    const copiedArr = cloneDeep(originArray);

    expect(copiedArr).toEqual(copiedArr[0]);
    expect(copiedArr).not.toBe(originArray);
    expect(copiedArr).not.toBe(originArray[0]);
  });

  it('should also copy the object circular references deeply.', () => {
    const originObject = { origin: {} };
    originObject.origin = originObject;

    const copiedObject = cloneDeep(originObject);

    expect(copiedObject).toEqual(copiedObject.origin);
    expect(copiedObject).not.toBe(originObject);
    expect(copiedObject).not.toBe(originObject.origin);
  });

  it('should deeply copy an object', () => {
    const originObj = { a: 1, b: { c: 2, d: [0, 1] } };
    const copiedObj = cloneDeep(originObj);

    expect(copiedObj).toEqual(originObj);
    expect(copiedObj).not.toBe(originObj);
    expect(copiedObj.b.d).not.toBe(originObj.b.d);
  });

  it('should deeply copy a set', () => {
    const originSet = new Set([1, 2, 3]);
    const copiedSet = cloneDeep(originSet);

    expect(copiedSet).toEqual(originSet);
    expect(copiedSet).not.toBe(originSet);
  });

  it('should deeply copy a map', () => {
    const originMap = new Map([
      ['a', 1],
      ['b', 2],
    ]);
    const copiedMap = cloneDeep(originMap);

    expect(copiedMap).toEqual(originMap);
    expect(copiedMap).not.toBe(originMap);
  });

  it('should deeply copy a date', () => {
    const date = new Date();
    const copiedDate = cloneDeep(date);

    expect(copiedDate.getTime()).toEqual(date.getTime());
    expect(copiedDate).not.toBe(date);
  });

  it('should deeply copy a regex', () => {
    const regex = /test/gi;
    const copiedRegex = cloneDeep(regex);

    expect(copiedRegex.source).toEqual(regex.source);
    expect(copiedRegex.flags).toEqual(regex.flags);
    expect(copiedRegex).not.toBe(regex);
  });
});
