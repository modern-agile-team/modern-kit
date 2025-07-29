import { describe, it, expectTypeOf } from 'vitest';
import { PropertyAllPath } from '.';

describe('PropertyAllPath', () => {
  it('주어진 객체 타입의 모든 속성 경로를 반환합니다.', () => {
    expectTypeOf<
      PropertyAllPath<{ a: string; b: { c: string; d: number } }>
    >().toEqualTypeOf<'a' | 'b' | 'b.c' | 'b.d' | 'b?.c' | 'b?.d'>();
  });
});
