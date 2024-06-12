import { Primitive } from '.';

describe('Primitive', () => {
  it('should properly infer the type', () => {
    const value = 1 as Primitive;

    if (typeof value === 'number') {
      expectTypeOf(value).toEqualTypeOf<number>();
    }

    if (typeof value === 'string') {
      expectTypeOf(value).toEqualTypeOf<string>();
    }

    if (typeof value === 'boolean') {
      expectTypeOf(value).toEqualTypeOf<boolean>();
    }

    if (typeof value === 'symbol') {
      expectTypeOf(value).toEqualTypeOf<symbol>();
    }

    if (typeof value === 'bigint') {
      expectTypeOf(value).toEqualTypeOf<bigint>();
    }

    if (value === null) {
      expectTypeOf(value).toEqualTypeOf<null>();
    }

    if (value === undefined) {
      expectTypeOf(value).toEqualTypeOf<undefined>();
    }
  });
});
