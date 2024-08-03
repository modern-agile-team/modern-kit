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
    const iteratee = ({
      key,
    }: {
      key: string | number;
      value: string;
    }): string => key.toString().toUpperCase();
    const expected = { A: 'apple', B: 'banana', C: 'cherry' } as const;

    const result = mapKeys(obj, iteratee);

    expect(result).toEqual(expected);
  });

  it('should return an empty object for an empty input object', () => {
    const obj = {} as const;
    const iteratee = ({ key }: { key: string | number; value: any }): string =>
      key.toString();
    const expected = {} as const;

    const result = mapKeys(obj, iteratee);

    expect(result).toEqual(expected);
  });
});
