import { describe, it, expect } from 'vitest';
import { objectValues } from '.';

describe('objectValues', () => {
  it('Object.values()와 동일하게 동작해야 합니다', () => {
    const symbol = Symbol('d');
    const obj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      [symbol]: 5,
    } as const;

    const values = objectValues(obj); // (1 | 2 | 3 | 4)[]

    expect(values).toEqual(Object.values(obj));
    expect(values).toEqual([1, 2, 3, 4]);
  });
});
