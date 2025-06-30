import { describe, it, expectTypeOf } from 'vitest';
import { Promiseable } from '.';

describe('Promiseable', () => {
  it('주어진 타입을 기반으로 기존 타입과 Promise로 매핑된 타입을 반환해야 합니다.', () => {
    expectTypeOf<Promiseable<number>>().toEqualTypeOf<
      Promise<number> | number
    >();
  });

  it('조건식을 통해 주어진 타입과 Promise로 매핑된 타입을 구분 할 수 있어야 합니다.', () => {
    const promise = Promise.resolve(1) as Promiseable<number>;

    if (promise instanceof Promise) {
      expectTypeOf(promise).toEqualTypeOf<Promise<number>>();
    } else {
      expectTypeOf(promise).toEqualTypeOf<number>();
    }
  });
});
