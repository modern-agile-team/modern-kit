import { describe, it, expectTypeOf } from 'vitest';
import { DistributiveOmit } from '.';

describe('DistributiveOmit', () => {
  it('유니온 타입에서 각각의 타입에 대해 Omit을 적용한 타입을 반환해야 합니다. ', () => {
    const obj = { a: 1, b: 2 } as
      | { a: number; b: number }
      | { a: string; c: number };

    const result: DistributiveOmit<typeof obj, 'a'> = { b: 2 };

    expectTypeOf(result as { b: number } | { c: number }).toEqualTypeOf<
      { b: number } | { c: number }
    >();
  });
});
