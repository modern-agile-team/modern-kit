import { invert } from '.';

describe('invert', () => {
  it('should invert the keys and values of an object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = invert(obj);

    expect(result).toEqual({ 1: 'a', 2: 'b', 3: 'c' });
  });

  it('should use the keyTransformer if provided', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keyTransformer = (value: number) => `key_${value}`;
    const result = invert(obj, keyTransformer);

    expect(result).toEqual({ key_1: 'a', key_2: 'b', key_3: 'c' });
  });

  it('should handle an empty object', () => {
    const obj = {};
    const result = invert(obj);

    expect(result).toEqual({});
  });

  it('should handle objects with duplicate values', () => {
    const obj = { a: 1, b: 1, c: 2 };
    const result = invert(obj);

    expect(result).toEqual({ 1: 'b', 2: 'c' });
  });

  it('should skip properties not directly on the object', () => {
    const obj = Object.create({ inherited: 'inherited' });
    obj.a = 1;
    obj.b = 2;
    const result = invert(obj);

    expect(result).toEqual({ 1: 'a', 2: 'b' });
  });
});
