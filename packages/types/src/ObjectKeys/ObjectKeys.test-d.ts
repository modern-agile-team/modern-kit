import { describe, it, expectTypeOf } from 'vitest';
import { ObjectKeys } from '.';

describe('ObjectKeys', () => {
  it('Object.keys의 반환 타입을 명확하게 합니다. symbol은 제외합니다.', () => {
    const test = {
      foo: 'foo',
      bar: 'bar',
      [Symbol('test')]: 'test',
    } as const;

    expectTypeOf(Object.keys(test)).toEqualTypeOf<string[]>();
    expectTypeOf<ObjectKeys<typeof test>>().toEqualTypeOf<'foo' | 'bar'>();
  });
});
