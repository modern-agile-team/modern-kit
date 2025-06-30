import { describe, it, expectTypeOf } from 'vitest';
import { Merge } from '.';

describe('Merge', () => {
  it('두 개의 객체 타입을 병합하여 새로운 객체 타입을 반환해야 합니다.', () => {
    type A = { a: string; b: number };
    type B = { b: string; c: boolean };

    expectTypeOf<Merge<A, B>>().toMatchTypeOf<{
      a: string;
      b: string;
      c: boolean;
    }>();
  });
});
