import { objectValues } from '.';

describe('objectValues', () => {
  it('should behave identical to Object.values()', () => {
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
