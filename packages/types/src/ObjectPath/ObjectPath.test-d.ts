import { describe, it, expectTypeOf } from 'vitest';
import { ObjectPath } from '.';

describe('ObjectPath', () => {
  it('객체의 속성 경로를 반환합니다.', () => {
    expectTypeOf<
      ObjectPath<{ a: string; b: { c: string; d: number } }>
    >().toEqualTypeOf<'a' | 'b' | 'b.c' | 'b.d'>();
  });

  it('객체 타입이 아닌 경우 never 타입을 반환합니다.', () => {
    expectTypeOf<ObjectPath<string>>().toEqualTypeOf<never>();
  });
});
