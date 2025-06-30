import { describe, it, expectTypeOf } from 'vitest';
import { ObjectEntries } from '.';

describe('ObjectEntries', () => {
  it('Object.entries의 반환 타입을 명확하게 합니다. symbol은 제외합니다.', () => {
    const test = {
      foo: 'foo',
      bar: 'bar',
      [Symbol('test')]: 'test',
    } as const;

    expectTypeOf(Object.entries(test)).toEqualTypeOf<
      [string, 'foo' | 'bar'][]
    >();
    expectTypeOf<ObjectEntries<typeof test>>().toEqualTypeOf<
      ['foo' | 'bar', 'foo' | 'bar'][]
    >();
  });
});
