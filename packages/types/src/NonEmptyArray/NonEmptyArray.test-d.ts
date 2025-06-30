import { describe, it, expectTypeOf } from 'vitest';
import type { NonEmptyArray } from '.';

describe('NonEmptyArray', () => {
  it('배열이 최소 1개 이상의 요소를 포함하는 타입이어야 합니다.', () => {
    expectTypeOf<NonEmptyArray<number>>().toEqualTypeOf<
      [number, ...number[]]
    >();

    expectTypeOf<NonEmptyArray<string>>().toEqualTypeOf<
      [string, ...string[]]
    >();
  });
});
