import { parseJSON } from '.';

describe('parseJSON', () => {
  it('should return original value for falsy value', () => {
    const falseValue = parseJSON(false);
    const zeroNumberValue = parseJSON(0);
    const emptyStringValue = parseJSON('');
    const nullValue = parseJSON(null);
    const undefinedValue = parseJSON(undefined);
    const NaNValue = parseJSON(NaN);

    expect(falseValue).toBe(false);
    expect(zeroNumberValue).toBe(0);
    expect(emptyStringValue).toBeNull();
    expect(nullValue).toBeNull();
    expect(undefinedValue).toBeUndefined();
    expect(NaNValue).toBeNaN();
  });

  it('should correctly parse stringified value', () => {
    const result = parseJSON(`{ "a": 1, "b": 2 }`);
    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('should correctly parse complex JSON objects', () => {
    const complexJson = `{
      "a": 1,
      "b": [2, 3, {"c": 4}],
      "d": {"e": 5, "f": 6}
    }`;
    const result = parseJSON(complexJson);
    expect(result).toEqual({
      a: 1,
      b: [2, 3, { c: 4 }],
      d: { e: 5, f: 6 },
    });
  });

  it('should correctly parse JSON arrays', () => {
    const jsonArray = `["foo", {"bar": "baz"}]`;
    const result = parseJSON(jsonArray);

    expect(result).toEqual(['foo', { bar: 'baz' }]);
  });

  it('should return null for incorrect JSON format', () => {
    const incorrectJson = `{a: 1, b: 2}`;
    const result = parseJSON(incorrectJson);

    expect(result).toBeNull();
  });
});
