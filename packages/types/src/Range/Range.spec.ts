import { describe, it, expectTypeOf } from 'vitest';
import { Range } from '.';

describe('Range', () => {
  it('범위 내 숫자라면 정상 출력하고, 범위 밖 숫자라면 타입에러를 발생시킵니다.', () => {
    const inRangeInteger: Range<1, 5> = 4;
    const outOfRangeInteger = 6 as unknown as Range<1, 5>;

    expectTypeOf(inRangeInteger).toEqualTypeOf<4>();
    expectTypeOf(outOfRangeInteger).not.toMatchTypeOf<6>();
  });

  it('<number, number>타입이 아니라면 never를 반환합니다.', () => {
    const otherTypeRange: Range<1, '5'> = null as unknown as Range<1, '5'>;
    const otherTypeRange2: Range<'1', 5> = null as unknown as Range<'1', 5>;
    const otherTypeRange3: Range<'1', '5'> = null as unknown as Range<'1', '5'>;
    const otherTypeRange4: Range<false, true> = null as unknown as Range<
      false,
      true
    >;

    expectTypeOf(otherTypeRange).toEqualTypeOf<never>();
    expectTypeOf(otherTypeRange2).toEqualTypeOf<never>();
    expectTypeOf(otherTypeRange3).toEqualTypeOf<never>();
    expectTypeOf(otherTypeRange4).toEqualTypeOf<never>();
  });
});
