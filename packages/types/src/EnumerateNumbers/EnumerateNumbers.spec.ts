import { describe, it, expectTypeOf } from 'vitest';
import { EnumerateNumbers } from '.';

describe('EnumerateNumbers', () => {
  it('0 ~ N-1 까지 수라면 해당 정상적으로 타입을 반환하고, 그 외 숫자라면 never 타입을 반환합니다.', () => {
    const validEnumerate: EnumerateNumbers<5> = 3;
    const inValidEnumerate = 6 as unknown as EnumerateNumbers<5>;

    expectTypeOf(validEnumerate).toEqualTypeOf<3>();
    expectTypeOf(inValidEnumerate).not.toMatchTypeOf<6>();
  });

  it('number타입이 아니라면 never를 반환합니다.', () => {
    const stringTypeEnumerate = '5' as unknown as EnumerateNumbers<'5'>;
    const booleanTypeEnumerate = true as unknown as EnumerateNumbers<true>;
    const objectTypeEnumerate = { a: 1 } as unknown as EnumerateNumbers<{
      a: 1;
    }>;
    const arrayTypeEnumerate = [1, 2, 3] as unknown as EnumerateNumbers<
      number[]
    >;

    expectTypeOf(stringTypeEnumerate).toEqualTypeOf<never>();
    expectTypeOf(booleanTypeEnumerate).toEqualTypeOf<never>();
    expectTypeOf(objectTypeEnumerate).toEqualTypeOf<never>();
    expectTypeOf(arrayTypeEnumerate).toEqualTypeOf<never>();
  });

  it('값이 0인 경우 never타입을 반환합니다.', () => {
    const onlyZero = 0 as unknown as EnumerateNumbers<0>;

    expectTypeOf(onlyZero).toEqualTypeOf<never>();
  });
});
