import { describe, it, expect, expectTypeOf } from 'vitest';
import { omit } from '.';

describe('omit function', () => {
  it('should return a new object omitting multiple keys from an object', () => {
    const inputObj = { a: 1, b: 2, c: 3 };
    const omittedObj = omit(inputObj, ['b', 'c']);

    expect(omittedObj).toEqual({ a: 1 });

    // type
    expectTypeOf(omittedObj).toEqualTypeOf<{ a: number }>();
  });

  it('should return a new object that is deeply copied', () => {
    const inputObj = { a: 1, b: { x: 2, y: 3 }, c: 4 };
    const omittedObj = omit(inputObj, ['a', 'c']);

    expect(omittedObj.b).not.toBe(inputObj.b);
    expect(omittedObj.b).toEqual(inputObj.b);
  });
});
