import { parseJSON } from '.';

type Test1 = { a: 1; b: 2 };
type Test2 = {
  a: 1;
  b: [2, 3, { c: 4 }];
  d: { e: 5; f: 6 };
};
type Test3 = ['foo', { bar: 'baz' }];

describe('parseJSON', () => {
  it('should return original value for falsy value', () => {
    const falseValue = parseJSON<false>(false);
    const zeroNumberValue = parseJSON<0>(0);
    const emptyStringValue = parseJSON<''>('');
    const nullValue = parseJSON<null>(null);
    const undefinedValue = parseJSON<undefined>(undefined);
    const NaNValue = parseJSON<typeof NaN>(NaN);

    expect(falseValue).toBe(false);
    expect(zeroNumberValue).toBe(0);
    expect(emptyStringValue).toBe('');
    expect(nullValue).toBeNull();
    expect(undefinedValue).toBeUndefined();
    expect(NaNValue).toBeNaN();
  });

  it('should correctly parse stringified value', () => {
    const result = parseJSON<Test1>(`{ "a": 1, "b": 2 }`);

    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should correctly parse complex JSON objects', () => {
    const complexJson = `{
      "a": 1,
      "b": [2, 3, {"c": 4}],
      "d": {"e": 5, "f": 6}
    }`;
    const result = parseJSON<Test2>(complexJson);

    expect(result).toEqual({
      a: 1,
      b: [2, 3, { c: 4 }],
      d: { e: 5, f: 6 },
    });
  });

  it('should correctly parse JSON arrays', () => {
    const jsonArray = `["foo", {"bar": "baz"}]`;
    const result = parseJSON<Test3>(jsonArray);

    expect(result).toEqual(['foo', { bar: 'baz' }]);
  });

  it('should return null for incorrect JSON format', () => {
    const incorrectJson = `{a: 1, b: 2}`;
    const result = parseJSON<null>(incorrectJson);

    expect(result).toBeNull();
  });
});
