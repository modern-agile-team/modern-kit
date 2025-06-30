import { describe, it, expectTypeOf } from 'vitest';
import { Range } from '.';

describe('Range', () => {
  it('주어진 범위 내의 숫자들의 유니온 타입을 반환해야 합니다.', () => {
    expectTypeOf<Range<1, 5>>().toEqualTypeOf<1 | 2 | 3 | 4>();
  });

  it('매개변수가 모두 숫자 타입이 아닐 경우 never를 반환해야 합니다', () => {
    expectTypeOf<Range<1, '5'>>().toEqualTypeOf<never>();
    expectTypeOf<Range<'1', 5>>().toEqualTypeOf<never>();
    expectTypeOf<Range<'1', '5'>>().toEqualTypeOf<never>();
    expectTypeOf<Range<false, true>>().toEqualTypeOf<never>();
  });
});
