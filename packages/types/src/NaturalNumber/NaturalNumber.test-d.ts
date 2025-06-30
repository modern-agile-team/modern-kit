import { describe, it, expectTypeOf } from 'vitest';
import { NaturalNumber } from '.';

describe('NaturalNumber', () => {
  it('자연수라면 해당 타입을 반환하고, 자연수가 아니라면 never를 반환해야 합니다. ', () => {
    expectTypeOf<NaturalNumber<1>>().toEqualTypeOf<1>();
    expectTypeOf<NaturalNumber<3>>().toEqualTypeOf<3>();

    expectTypeOf<NaturalNumber<0>>().toEqualTypeOf<never>();
    expectTypeOf<NaturalNumber<-1>>().toEqualTypeOf<never>();
    expectTypeOf<NaturalNumber<1.5>>().toEqualTypeOf<never>();
  });
});
