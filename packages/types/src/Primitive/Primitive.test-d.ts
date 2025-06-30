import { describe, it, expectTypeOf } from 'vitest';
import { Primitive } from '.';

describe('Primitive', () => {
  it('원시 타입이 올바르게 추론되어야 합니다', () => {
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
