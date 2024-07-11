import { mergeProperties } from '.';

describe.concurrent('mergeProperties', () => {
  it('should merge properties from source to target when there are no overlapping keys', () => {
    const source = {
      a: 1,
      b: 2,
    };
    const target = {
      c: 3,
      d: 4,
    };
    const expectedObj = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    };

    expect(mergeProperties(source, target)).toEqual(expectedObj);
  });

  it('should deeply merge nested objects and arrays', () => {
    const source = {
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
    const target = {
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

    expect(mergeProperties(source, target)).toEqual(expectedObj);
  });

  it('should exclude specified keys from the merge', () => {
    const source = {
      a: 1,
      b: 2,
      d: [1, 2, 3],
    };
    const target = {
      c: 3,
      d: [4, 5, 6],
    };

    const expectedObj = {
      a: 1,
      b: 2,
      d: [1, 2, 3],
    };

    expect(mergeProperties(source, target, ['c', 'd'])).toEqual(expectedObj);
  });

  it('should override source properties with target properties when keys overlap', () => {
    const source = {
      a: 1,
      b: 2,
      c: 3,
    };
    const target = {
      a: [1, 2, 3],
      b: { c: 1 },
      c: 4,
    };

    const expectedObj = {
      a: [1, 2, 3],
      b: { c: 1 },
      c: 4,
    };

    expect(mergeProperties(source, target)).toEqual(expectedObj);
  });
});
