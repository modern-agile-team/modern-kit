import { describe, it, expect, expectTypeOf } from 'vitest';
import { invert } from '.';

describe('invert', () => {
  it('should invert the keys and values of an object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = invert(obj);

    expect(result).toEqual({ 1: 'a', 2: 'b', 3: 'c' });
    expectTypeOf(result).toEqualTypeOf<Record<number, 'a' | 'b' | 'c'>>();
  });

  it('should use the keyTransformer if provided(1)', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const keyTransformer = (value: number): `key_${number}` => `key_${value}`;
    const result = invert(obj, keyTransformer);

    expect(result).toEqual({ key_1: 'a', key_2: 'b', key_3: 'c' });
    expectTypeOf(result).toEqualTypeOf<
      Record<`key_${number}`, 'a' | 'b' | 'c'>
    >();
  });

  it('should use the keyTransformer if provided(2)', () => {
    const obj = { a: [1, 2, 3], b: [1, 2, 3], c: [1, 2, 3] } as const;
    const result = invert(obj, (value) => value[0]);

    expect(result).toEqual({ 1: 'c' });
    expectTypeOf(result).toEqualTypeOf<Record<1, 'a' | 'b' | 'c'>>();
  });

  it('should use the keyTransformer if provided(3)', () => {
    const obj = {
      a: { name: 'foo' },
      b: { name: 'bar' },
    } as const;
    const result = invert(obj, (value) => value.name);

    expect(result).toEqual({ foo: 'a', bar: 'b' });
    expectTypeOf(result).toEqualTypeOf<Record<'foo' | 'bar', 'a' | 'b'>>();
  });

  it('should exclude keys that contain symbols.', () => {
    const symbol = Symbol(1);

    const obj = { [symbol]: 1, foo: 2 } as const;
    const result = invert(obj);

    expect(result).toEqual({ 2: 'foo' });
    expectTypeOf(result).toEqualTypeOf<Record<1 | 2, 'foo'>>();
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
