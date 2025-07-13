import { describe, expectTypeOf, it } from 'vitest';
import { countBy } from '.';

describe('countBy', () => {
  it('배열의 타입에 맞게 타입 추론되어야 합니다.', () => {
    const data1 = countBy([1, 2, 3] as const);
    expectTypeOf(data1).toEqualTypeOf<Record<1 | 2 | 3, number>>();

    const data2 = countBy(['a', 'b', 'c']);
    expectTypeOf(data2).toEqualTypeOf<Record<string, number>>();
  });

  it('iteratee 반환 타입에 맞게 타입 추론되어야 합니다.', () => {
    const data1 = countBy(
      ['a', 'b', 'c', 'A', 'B', 'C', 'A', 'b'] as const,
      (value) => value.toLowerCase()
    );

    expectTypeOf(data1).toEqualTypeOf<Record<string, number>>();

    const data2 = countBy(
      [
        { address: 'seoul' },
        { address: 'incheon' },
        { address: 'seoul' },
        { address: 'busan' },
        { address: 'seoul' },
      ] as const,
      (value) => value.address
    );

    expectTypeOf(data2).toEqualTypeOf<
      Record<'seoul' | 'incheon' | 'busan', number>
    >();
  });
});
