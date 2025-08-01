import { describe, it, expectTypeOf } from 'vitest';
import { ExtractArrayElement } from '.';

describe('ExtractArrayElement', () => {
  it('배열의 요소 타입을 추출해야 합니다.', () => {
    expectTypeOf<ExtractArrayElement<number[]>>().toEqualTypeOf<number>();
  });

  it('중첩 배열에서 올바르게 타입을 추출해야 합니다.', () => {
    expectTypeOf<
      ExtractArrayElement<(number | (number | number[])[])[]>
    >().toEqualTypeOf<number>();
  });

  it('요소 타입이 혼합된 중첩 배열에서 올바르게 타입을 추출해야 합니다.', () => {
    expectTypeOf<
      ExtractArrayElement<
        (number | (string | number | (number | boolean)[])[])[]
      >
    >().toEqualTypeOf<string | number | boolean>();
  });
});
