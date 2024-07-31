import { describe, it, expectTypeOf } from 'vitest';
import { Promiseable } from '.';

describe('Promiseable', () => {
  it('should correctly handle and type-check a variable as either Promise<number> or number when assigned with Promiseable<number>', () => {
    const promise = Promise.resolve(1) as Promiseable<number>;

    expectTypeOf(promise).toEqualTypeOf<Promise<number> | number>();
  });

  it('should correctly distinguish between Promise<number> and number type at runtime when using Promiseable<number>', () => {
    const promise = Promise.resolve(1) as Promiseable<number>;

    if (promise instanceof Promise) {
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    } else {
      expectTypeOf(promise).toEqualTypeOf<number>();
    }
  });
});
