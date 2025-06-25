import { describe, it, expectTypeOf } from 'vitest';
import { EnumerateNumbers } from '.';

describe('EnumerateNumbers', () => {
  it('제네릭 타입이 number일 때 0부터 N-1까지의 숫자 유니언 타입을 반환해야 합니다', () => {
    expectTypeOf<EnumerateNumbers<6>>().toEqualTypeOf<0 | 1 | 2 | 3 | 4 | 5>();
  });

  it('제네릭 타입이 number가 아닐 때 never 타입을 반환해야 합니다', () => {
    expectTypeOf<EnumerateNumbers<'6'>>().toEqualTypeOf<never>();
    expectTypeOf<EnumerateNumbers<true>>().toEqualTypeOf<never>();
    expectTypeOf<EnumerateNumbers<{ value: 6 }>>().toEqualTypeOf<never>();
    expectTypeOf<EnumerateNumbers<number[]>>().toEqualTypeOf<never>();
  });
});
