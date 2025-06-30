import { describe, it, expectTypeOf } from 'vitest';
import { ExtractSetType } from '.';

describe('ExtractSetType', () => {
  it('Set의 제네릭 타입을 추론해야 합니다.', () => {
    type extractedSetType = ExtractSetType<Set<number>>; // 1 | 2 | 3 | 4 | 5

    expectTypeOf<extractedSetType>().toEqualTypeOf<number>();
  });

  it('Set이 아닌 경우 never를 반환해야 합니다.', () => {
    expectTypeOf<ExtractSetType<number>>().toEqualTypeOf<never>();
  });
});
