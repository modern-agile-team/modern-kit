import { describe, it, expect } from 'vitest';
import { mapKeys } from '.';

describe('mapKeys', () => {
  it('should map object keys by appending values to keys', () => {
    const obj = { a: 1, b: 2 } as const;
    const expected = { a1: 1, b2: 2 } as const;
    const result = mapKeys(obj, ({ key, value }) => `${key}${value}`);
    expect(result).toEqual(expected);
  });

  it('should map object keys to uppercase', () => {
    const obj = { a: 'apple', b: 'banana', c: 'cherry' } as const;
    const expected = { A: 'apple', B: 'banana', C: 'cherry' } as const;

    const result = mapKeys(obj, ({ key }) => key.toString().toUpperCase());

    expect(result).toEqual(expected);
  });

  it('should return an empty object for an empty input object', () => {
    const obj = {} as const;

    const expected = {} as const;

    const result = mapKeys(obj, ({ key }: { key: string }) => key.toString());

    expect(result).toEqual(expected);
  });
});
