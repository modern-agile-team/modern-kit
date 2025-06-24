import { describe, it, expectTypeOf } from 'vitest';
import { EnumerateNumbers } from '.';

describe('EnumerateNumbers', () => {
  it('0 ~ N-1 까지 수라면 해당 정상적으로 타입을 반환하고, 그 외 숫자라면 never 타입을 반환합니다.', () => {
    const validEnumerate: EnumerateNumbers<5> = 3;
    const inValidEnumerate = 6 as unknown as EnumerateNumbers<5>;

    expectTypeOf(validEnumerate).toEqualTypeOf<3>();
    expectTypeOf(inValidEnumerate).not.toMatchTypeOf<6>();
  });

  it('Acc 배열을 사용하여 시작 인덱스를 조정할 수 있습니다.', () => {
    type TwoToFive = EnumerateNumbers<6, [0, 0]>;
    const startTwo = 3 as unknown as TwoToFive;

    expectTypeOf(startTwo).toEqualTypeOf<2 | 3 | 4 | 5>();
  });
});
