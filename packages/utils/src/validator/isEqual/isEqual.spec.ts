import { describe, expect, it } from 'vitest';
import { isEqual } from '.';

describe('isEqual', () => {
  it('should return true if primitive types are deeply equal', () => {
    expect(isEqual(1, 1)).toBeTruthy();
    expect(isEqual('a', 'a')).toBeTruthy();

    expect(isEqual(1, 2)).toBeFalsy();
    expect(isEqual('a', 'b')).toBeFalsy();
  });

  it('should return true if objects or arrays are deeply equal', () => {
    expect(isEqual({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 1 } })).toBeTruthy();
    expect(
      isEqual(
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ]
      )
    ).toBeTruthy();

    expect(isEqual([1], [1, 2])).toBeFalsy();
    expect(isEqual({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 2 } })).toBeFalsy();
    expect(
      isEqual(
        [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
        ],
        [
          [1, 2, 3],
          [4, '5', 6],
          [7, 8, 9],
        ]
      )
    ).toBeFalsy();
  });

  it('should return true if function are deeply equal', () => {
    const origin = () => 1;
    const target = origin;
    expect(
      isEqual(
        () => 1,
        () => 1
      )
    ).toBeTruthy();
    expect(isEqual(origin, target)).toBeTruthy();
    expect(
      isEqual(
        (a: number) => a,
        (b: number) => b
      )
    ).toBeFalsy();
  });

  it('should return true if two objects with circular references are deeply equal', () => {
    const objA: any = { a: 1 };
    const objB: any = { a: 1 };

    objA.self = objA; // objA has a circular reference to itself
    objB.self = objB;

    expect(isEqual(objA, objB)).toBeTruthy();
  });

  it('should return true if null or undefined are deeply equal', () => {
    expect(isEqual(null, null)).toBeTruthy();
    expect(isEqual(undefined, undefined)).toBeTruthy();
    expect(isEqual(null, undefined)).toBeFalsy();
  });

  it('should return true if Set or Map are deeply equal', () => {
    // truthy
    expect(
      isEqual(
        new Set([1, { a: 1 }, [1, 2, { b: 2 }]]),
        new Set([1, { a: 1 }, [1, 2, { b: 2 }]])
      )
    ).toBeTruthy();

    const map1 = new Map();
    const map2 = new Map();

    map1.set(1, { a: 1 });
    map1.set(2, [1, 2, 3]);

    map2.set(1, { a: 1 });
    map2.set(2, [1, 2, 3]);

    expect(isEqual(map1, map2)).toBeTruthy();

    // falsy
    expect(isEqual(new Set(), new Map())).toBeFalsy();
    expect(isEqual(new Set([1]), new Set([1, 2]))).toBeFalsy();
    expect(
      isEqual(new Set([1, { a: 1 }, 2]), new Set([1, 2, { a: 1 }]))
    ).toBeFalsy();

    const map3 = new Map();
    const map4 = new Map();

    map3.set(1, { a: 1 });
    map3.set(2, [1, 2, 3]);

    map4.set(1, { a: 2 });
    map4.set(2, [1, 2, 4]);

    expect(
      isEqual(
        new Map([['1', 1]]),
        new Map([
          ['1', 1],
          ['2', 2],
        ])
      )
    ).toBeFalsy();
    expect(isEqual(map3, map4)).toBeFalsy();
  });

  it('should return true for identical arrays with different element order', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [3, 2, 1];
    expect(isEqual(new Set(arr1), new Set(arr2))).toBe(false);
  });

  it('should return true for NaN values', () => {
    expect(isEqual(NaN, NaN)).toBe(true);
  });

  it('should return false for NaN and a number', () => {
    expect(isEqual(NaN, 1)).toBe(false);
  });

  it('should return false for NaN and undefined', () => {
    expect(isEqual(NaN, undefined)).toBe(false);
  });
});
