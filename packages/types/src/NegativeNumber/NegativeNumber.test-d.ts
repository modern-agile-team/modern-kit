import { describe, it, expectTypeOf } from 'vitest';
import { NegativeNumber } from '.';

describe('NegativeNumber', () => {
  it('음수라면 해당 타입을 반환하고, 음수가 아니라면 never를 반환해야 합니다. ', () => {
    expectTypeOf<NegativeNumber<-1>>().toEqualTypeOf<-1>();
    expectTypeOf<NegativeNumber<-10>>().toEqualTypeOf<-10>();

    expectTypeOf<NegativeNumber<0>>().toEqualTypeOf<never>();
    expectTypeOf<NegativeNumber<1>>().toEqualTypeOf<never>();
    expectTypeOf<NegativeNumber<1.5>>().toEqualTypeOf<never>();
  });
});
