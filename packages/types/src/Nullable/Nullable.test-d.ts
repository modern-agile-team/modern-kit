import { describe, it, expectTypeOf } from 'vitest';
import { Nullable } from '.';

describe('Nullable', () => {
  it('제네릭 타입으로 넣어준 타입과 더불어 null을 허용합니다.', () => {
    const test = '123' as Nullable<string>;

    expectTypeOf(test).toEqualTypeOf<string | null>();
  });

  it('조건식으로 타입을 좁히면 제네릭 타입으로 좁혀집니다.', () => {
    const test = '123' as Nullable<string>;

    if (test) {
      expectTypeOf(test).toEqualTypeOf<string>();
    }
  });
});
