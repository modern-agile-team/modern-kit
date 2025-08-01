import { describe, it, expectTypeOf } from 'vitest';
import { ExtractArrayElement } from '.';

describe('ExtractArrayElement', () => {
  it('배열의 요소 타입을 추출해야 합니다.', () => {
    const arr = [1, 2, 3];

    expectTypeOf<ExtractArrayElement<typeof arr>>().toEqualTypeOf<number>();
  });

  it('중첩 배열에서 올바르게 타입을 추출해야 합니다.', () => {
    const arr = [1, 2, [3, 4, [5, 6]]];
    // (number | (number | number[])[])[]

    expectTypeOf<ExtractArrayElement<typeof arr>>().toEqualTypeOf<number>();
  });

  it('요소 타입이 혼합된 중첩 배열에서 올바르게 타입을 추출해야 합니다.', () => {
    const arr = [1, 2, ['string', 4, [true, 6]]];
    // (number | (string | number | (number | boolean)[])[])[]

    expectTypeOf<ExtractArrayElement<typeof arr>>().toEqualTypeOf<
      string | number | boolean
    >();
  });
});
