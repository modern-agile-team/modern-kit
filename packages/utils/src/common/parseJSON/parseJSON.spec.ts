import { describe, it, expect } from 'vitest';
import { parseJSON } from '.';

type Test1 = { a: 1; b: 2 };
type Test2 = {
  a: 1;
  b: [2, 3, { c: 4 }];
  d: { e: 5; f: 6 };
};
type Test3 = ['foo', { bar: 'baz' }];

describe('parseJSON', () => {
  it('falsy 값이 주어졌을 때 원본 값을 반환해야 합니다', () => {
    const falseValue = parseJSON(false);
    const zeroNumberValue = parseJSON(0);
    const nullValue = parseJSON(null);
    const undefinedValue = parseJSON(undefined);
    const NaNValue = parseJSON(NaN);

    expect(falseValue).toBe(false);
    expect(zeroNumberValue).toBe(0);
    expect(nullValue).toBeNull();
    expect(undefinedValue).toBeUndefined();
    expect(NaNValue).toBeNaN();
  });

  it('문자열화된 값을 올바르게 파싱해야 합니다', () => {
    const result = parseJSON<Test1>(`{ "a": 1, "b": 2 }`);

    expect(result).toEqual({ a: 1, b: 2 });
  });

  it('복잡한 JSON 객체를 올바르게 파싱해야 합니다', () => {
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

  it('JSON 배열을 올바르게 파싱해야 합니다', () => {
    const jsonArray = `["foo", {"bar": "baz"}]`;
    const result = parseJSON<Test3>(jsonArray);

    expect(result).toEqual(['foo', { bar: 'baz' }]);
  });

  it('잘못된 JSON 형식이 주어졌을 때 에러를 발생시켜야 합니다', () => {
    expect(() => parseJSON('')).toThrowError();
    expect(() => parseJSON(`{a: 1, b: 2}`)).toThrowError();
  });
});
