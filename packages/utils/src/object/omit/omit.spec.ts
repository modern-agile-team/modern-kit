import { describe, it, expect } from 'vitest';
import { omit } from '.';

describe('omit function', () => {
  it('should return a new object omitting a single key from an object', () => {
    const inputObj = { a: 1, b: 2, c: 3 } as const;
    const omittedObj = omit(inputObj, ['b']);

    expect(omittedObj).toEqual({ a: 1, c: 3 });
  });

  it('should return a new object omitting multiple keys from an object', () => {
    const symbol = Symbol('d');
    const inputObj = { a: 1, b: 2, c: 3, d: 4, [symbol]: 5 } as const;
    const omittedObj = omit(inputObj, ['b', 'd', symbol]);

    expect(omittedObj).toEqual({ a: 1, c: 3 });
  });

  it('should return a new object that is deeply copied', () => {
    const symbol = Symbol('d');
    const inputObj = { a: 1, b: { x: 2, y: 3 }, c: 4, [symbol]: 5 } as const;
    const omittedObj = omit(inputObj, ['a', 'c']);

    expect(omittedObj.b).not.toBe(inputObj.b);
    expect(omittedObj.b).toEqual(inputObj.b);
  });
});
