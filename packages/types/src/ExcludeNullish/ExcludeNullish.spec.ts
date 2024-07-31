import { describe, it, expectTypeOf } from 'vitest';
import { ExcludeNullish } from '.';

describe('ExcludeNullish', () => {
  it('제네릭으로 넣어준 타입에서 null과 undefined를 제외합니다.', () => {
    const test = '123' as ExcludeNullish<string | null | undefined>;

    expectTypeOf(test).toEqualTypeOf<string>();
  });
});
