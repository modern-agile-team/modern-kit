import { describe, it, expectTypeOf } from 'vitest';
import { WholeNumber } from '.';

describe('WholeNumber', () => {
  it('0과 양의 정수라면 해당 타입을 반환하고, 음수나 소수라면 never를 반환해야 합니다.', () => {
    expectTypeOf<WholeNumber<0>>().toEqualTypeOf<0>();
    expectTypeOf<WholeNumber<1>>().toEqualTypeOf<1>();
    expectTypeOf<WholeNumber<10>>().toEqualTypeOf<10>();

    expectTypeOf<WholeNumber<-1>>().toEqualTypeOf<never>();
    expectTypeOf<WholeNumber<-10>>().toEqualTypeOf<never>();
    expectTypeOf<WholeNumber<1.5>>().toEqualTypeOf<never>();
  });
});
