import { describe, it, expect } from 'vitest';
import { mapValues } from '.';

describe('mapValues', () => {
  it('should map object values by extracting age property', () => {
    const users = {
      fred: { user: 'fred', age: 40 },
      pebbles: { user: 'pebbles', age: 1 },
    };

    const iteratee = ({
      value,
    }: {
      key: string | number;
      value: { user: string; age: number };
    }): number => value.age;
    const expected = { fred: 40, pebbles: 1 };

    const result = mapValues(users, iteratee);

    expect(result).toEqual(expected);
  });

  it('should map object values by transforming to uppercase string', () => {
    const obj = { a: 'apple', b: 'banana', c: 'cherry' } as const;
    const iteratee = ({
      value,
    }: {
      key: string | number;
      value: string;
    }): string => value.toUpperCase();
    const expected = { a: 'APPLE', b: 'BANANA', c: 'CHERRY' } as const;

    const result = mapValues(obj, iteratee);

    expect(result).toEqual(expected);
  });

  it('should return an empty object for an empty input object', () => {
    const obj = {};
    const iteratee = ({ value }: { key: string | number; value: any }): any =>
      value;
    const expected = {};

    const result = mapValues(obj, iteratee);

    expect(result).toEqual(expected);
  });
});
