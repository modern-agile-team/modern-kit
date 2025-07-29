import { describe, it, expectTypeOf } from 'vitest';
import { PropertyPath } from '.';

describe('PropertyPath', () => {
  it('주어진 객체 타입을 기반으로 유효한 프로퍼티 경로를 반환합니다.', () => {
    expectTypeOf<
      PropertyPath<{ a: string; b: { c: string; d: number } }>
    >().toEqualTypeOf<'a' | 'b' | 'b.c' | 'b.d'>();

    expectTypeOf<
      PropertyPath<{ a: string; b?: { c: string; d: number } }>
    >().toEqualTypeOf<'a' | 'b' | 'b?.c' | 'b?.d'>();
  });
});
