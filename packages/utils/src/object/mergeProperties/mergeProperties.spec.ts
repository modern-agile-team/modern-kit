import { mergeProperties } from '.';

describe('mergeProperties', () => {
  it('merges properties from source into target without overlap', () => {
    const target = {
      a: 1,
      b: 2,
    };
    const source = {
      c: 3,
      d: 4,
    };
    const expectedObj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };

    expect(mergeProperties(target, source)).toEqual(expectedObj);
  });

  it('should return the target if either the target or source argument is a primitive value', () => {
    const target = 1 as any;
    const source = 1 as any;

    expect(mergeProperties(target, source)).toBe(1);
  });

  it('merges properties and combines nested objects and arrays from source into target', () => {
    const target = {
      a: 1,
      b: 2,
      c: {
        c_a: 1,
        c_b: 2,
      },
      d: 4,
      e: [1, 2],
      f: {
        f_a: [1, 2],
      },
    };
    const source = {
      c: {
        c_c: 3,
        c_d: 4,
      },
      d: 5,
      e: [3, 4],
      f: {
        f_a: [3, 4],
      },
    };
    const expectedObj = {
      a: 1,
      b: 2,
      c: {
        c_a: 1,
        c_b: 2,
        c_c: 3,
        c_d: 4,
      },
      d: 5,
      e: [1, 2, 3, 4],
      f: {
        f_a: [1, 2, 3, 4],
      },
    };

    expect(mergeProperties(target, source)).toEqual(expectedObj);
  });

  it('does not merge excluded properties specified in the third argument', () => {
    const target = {
      a: 1,
      b: 2,
      d: [1, 2, 3],
    };
    const source = {
      c: 3,
      d: [4, 5, 6],
    };
    const expectedObj = {
      a: 1,
      b: 2,
      d: [1, 2, 3],
    };

    expect(mergeProperties(target, source, ['c', 'd'])).toEqual(expectedObj);
  });
});
