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
});
