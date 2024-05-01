import { ExtractMapType } from '.';

describe('ExtractMapType', () => {
  it('should infer the generic type of a Map', () => {
    const key = 'foo' as 'foo' | 'bar';
    const value = 1 as 1 | 2 | 3;

    const testMap = new Map<typeof key, typeof value>();

    type extractedMapType = ExtractMapType<typeof testMap>; // ["foo" | "bar", 1 | 2 | 3]

    expectTypeOf(key).toEqualTypeOf<extractedMapType[0]>();
    expectTypeOf(value).toEqualTypeOf<extractedMapType[1]>();
  });
});
