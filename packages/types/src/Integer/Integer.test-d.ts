import { describe, it, expectTypeOf } from 'vitest';
import { Integer } from '.';

describe('Integer', () => {
  it('정수라면 해당 타입을 반환하고, 정수가 아니라면 never를 반환해야 합니다. ', () => {
    expectTypeOf<Integer<1>>().toEqualTypeOf<1>();
    expectTypeOf<Integer<-1>>().toEqualTypeOf<-1>();

    expectTypeOf<Integer<1.5>>().toEqualTypeOf<never>();
  });
});
