import { wrapInArray } from '.';

describe.concurrent('wrapInArray', () => {
  it('should wrap a non-array value in an array', () => {
    const strValue = 'ModernAgile';
    const wrappedInArray = wrapInArray('ModernAgile');

    expect(wrappedInArray).toEqual([strValue]);
  });

  it('should not wrap an array value in an array', () => {
    const arrayValue = [1, 2, 3];
    const wrappedInArray = wrapInArray([1, 2, 3]);

    expect(wrappedInArray).not.toBe(arrayValue);
    expect(wrappedInArray).toEqual(arrayValue);
  });

  it('should return an array with deeply copied elements', () => {
    const objValue = { a: 1, b: 2, c: 3 };
    const wrappedInArray = wrapInArray(objValue);

    expect(wrappedInArray[0]).not.toBe(objValue);
    expect(wrappedInArray).toEqual([objValue]);
  });
});
