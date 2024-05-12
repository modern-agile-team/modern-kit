import { describe, expect, it } from 'vitest';
import { deepEqual } from '.';

describe('deepEqual', () => {
  it('should return true if primitive types are deeply equal', () => {
    expect(deepEqual(1, 1)).toBeTruthy();
    expect(deepEqual('a', 'a')).toBeTruthy();

    expect(deepEqual(1, 2)).toBeFalsy();
    expect(deepEqual('a', 'b')).toBeFalsy();
  });

  it('should return true if objects or arrays are deeply equal', () => {
    expect(
      deepEqual({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 1 } })
    ).toBeTruthy();
    expect(
      deepEqual(
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

    expect(deepEqual([1], [1, 2])).toBeFalsy();
    expect(deepEqual({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 2 } })).toBeFalsy();
    expect(
      deepEqual(
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

  it('should return true if null or undefined are deeply equal', () => {
    expect(deepEqual(null, null)).toBeTruthy();
    expect(deepEqual(undefined, undefined)).toBeTruthy();
    expect(deepEqual(null, undefined)).toBeFalsy();
  });

  it('should return true if Set or Map are deeply equal', () => {
    // truthy
    expect(
      deepEqual(
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

    expect(deepEqual(map1, map2)).toBeTruthy();

    // falsy
    expect(deepEqual(new Set(), new Map())).toBeFalsy();
    expect(deepEqual(new Set([1]), new Set([1, 2]))).toBeFalsy();
    expect(
      deepEqual(new Set([1, { a: 1 }, 2]), new Set([1, 2, { a: 1 }]))
    ).toBeFalsy();

    const map3 = new Map();
    const map4 = new Map();

    map3.set(1, { a: 1 });
    map3.set(2, [1, 2, 3]);

    map4.set(1, { a: 2 });
    map4.set(2, [1, 2, 4]);

    expect(
      deepEqual(
        new Map([['1', 1]]),
        new Map([
          ['1', 1],
          ['2', 2],
        ])
      )
    ).toBeFalsy();
    expect(deepEqual(map3, map4)).toBeFalsy();
  });
});
