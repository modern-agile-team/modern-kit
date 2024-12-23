import { describe, it, expect } from 'vitest';
import { objectKeys } from '.';

describe('objectKeys', () => {
  it('Object.keys()와 동일하게 동작해야 합니다', () => {
    const symbol = Symbol('d');
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      [symbol]: 4,
    } as const;

    const keys = objectKeys(obj); // ("a" | "b" | "c")[]

    expect(keys).toEqual(Object.keys(obj));
    expect(keys).toEqual(['a', 'b', 'c']);
  });
});
