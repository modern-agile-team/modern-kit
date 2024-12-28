import { describe, it, expectTypeOf } from 'vitest';
import { NaturalNumber } from '.';

describe('NaturalNumber', () => {
  it('자연수라면 해당 타입을 반환하고, 자연수가 아니라면 never를 반환해야 합니다. ', () => {
    const validNaturalNumber: NaturalNumber<1> = 1;

    const invalidNaturalNumber1: NaturalNumber<0> = null as NaturalNumber<0>;
    const invalidNaturalNumber2: NaturalNumber<-1> = null as NaturalNumber<-1>;
    const invalidNaturalNumber3: NaturalNumber<1.5> =
      null as NaturalNumber<1.5>;

    expectTypeOf(validNaturalNumber).toEqualTypeOf<1>();
    expectTypeOf(invalidNaturalNumber1).toEqualTypeOf<never>();
    expectTypeOf(invalidNaturalNumber2).toEqualTypeOf<never>();
    expectTypeOf(invalidNaturalNumber3).toEqualTypeOf<never>();
  });
});
