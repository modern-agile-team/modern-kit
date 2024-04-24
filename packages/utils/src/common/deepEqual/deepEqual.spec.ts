import { describe, expect, it } from 'vitest';
import { deepEqual } from '.';

describe('deepEqual', () => {
  it('should return true if primitive types are deeply equal', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual('a', 'a')).toBe(true);

    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual('a', 'b')).toBe(false);
  });

  it('should return true if objects or arrays are deeply equal', () => {
    expect(deepEqual({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 1 } })).toBe(true);
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
    ).toBe(true);

    expect(deepEqual({ a: 1, b: { c: 1 } }, { a: 1, b: { c: 2 } })).toBe(false);
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
    ).toBe(false);
  });

  it('should return true if null or undefined are deeply equal', () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(null, undefined)).toBe(false);
  });

  it('should return true if Set or Map are deeply equal', () => {
    expect(
      deepEqual(
        new Set([1, { a: 1 }, [1, 2, { b: 2 }]]),
        new Set([1, { a: 1 }, [1, 2, { b: 2 }]])
      )
    ).toBe(true);

    const map1 = new Map();
    const map2 = new Map();

    map1.set(1, { a: 1 });
    map1.set(2, [1, 2, 3]);

    map2.set(1, { a: 1 });
    map2.set(2, [1, 2, 3]);

    expect(deepEqual(map1, map2)).toBe(true);

    expect(
      deepEqual(new Set([1, { a: 1 }, 2]), new Set([1, 2, { a: 1 }]))
    ).toBe(false);

    const map3 = new Map();
    const map4 = new Map();

    map3.set(1, { a: 1 });
    map3.set(2, [1, 2, 3]);

    map4.set(1, { a: 2 });
    map4.set(2, [1, 2, 4]);

    expect(deepEqual(map3, map4)).toBe(false);
  });
});
