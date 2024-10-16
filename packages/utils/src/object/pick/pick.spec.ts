import { describe, it, expect, expectTypeOf } from 'vitest';
import { pick } from '.';

describe('pick', () => {
  it('should return a new object with multiple keys extracted from an object', () => {
    const inputObj = { a: 1, b: 2, c: 3 };
    const pickedObj = pick(inputObj, ['b', 'c']);

    expect(pickedObj).toEqual({ b: 2, c: 3 });

    // type
    expectTypeOf(pickedObj).toEqualTypeOf<{ b: number; c: number }>();
  });
});
