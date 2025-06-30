import { describe, it, expectTypeOf } from 'vitest';
import { DistributiveOmit } from '.';

describe('DistributiveOmit', () => {
  it('유니온 타입에서 각각의 타입에 대해 Omit을 적용한 타입을 반환해야 합니다. ', () => {
    type Union = { a: string; b: number } | { a: number; c: boolean };
    type Result = DistributiveOmit<Union, 'a'>;

    expectTypeOf<Result>().toEqualTypeOf<{ b: number } | { c: boolean }>();
  });
});
