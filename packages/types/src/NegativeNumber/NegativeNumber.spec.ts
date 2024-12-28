import { describe, it, expectTypeOf } from 'vitest';
import { NegativeNumber } from '.';

describe('NegativeNumber', () => {
  it('음수라면 해당 타입을 반환하고, 음수가 아니라면 never를 반환해야 합니다. ', () => {
    const validNegative: NegativeNumber<-1> = -1;

    const invalidNegative1: NegativeNumber<1> =
      null as unknown as NegativeNumber<1>; // 양수

    const invalidNegative2: NegativeNumber<1.5> =
      null as unknown as NegativeNumber<1.5>; // 소수

    expectTypeOf(validNegative).toEqualTypeOf<-1>();
    expectTypeOf(invalidNegative1).toEqualTypeOf<never>();
    expectTypeOf(invalidNegative2).toEqualTypeOf<never>();
  });
});
