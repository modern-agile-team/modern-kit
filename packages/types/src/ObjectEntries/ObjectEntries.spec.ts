import { describe, expectTypeOf, it } from 'vitest';
import { ObjectEntries } from '.';

describe('ObjectKeys', () => {
  it('Object.entries의 반환 타입을 명확하게 합니다. symbol은 제외합니다.', () => {
    const test = {
      foo: 'foo',
      bar: 'bar',
    } as const;

    const defaultEntries = Object.entries(test);
    const AppliedEntries = Object.entries(test) as ObjectEntries<typeof test>;

    expectTypeOf(defaultEntries).toEqualTypeOf<[string, 'foo' | 'bar'][]>();
    expectTypeOf(AppliedEntries).toEqualTypeOf<
      ['foo' | 'bar', 'foo' | 'bar'][]
    >();
  });
});
