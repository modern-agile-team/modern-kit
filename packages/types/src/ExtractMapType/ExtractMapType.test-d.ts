import { describe, it, expectTypeOf } from 'vitest';
import { ExtractMapType } from '.';

describe('ExtractMapType', () => {
  it('Map의 제네릭 타입을 올바르게 추론해야 합니다.', () => {
    type extractedMapType = ExtractMapType<Map<'foo' | 'bar', 1 | 2 | 3>>;
    // ["foo" | "bar", 1 | 2 | 3]

    expectTypeOf<extractedMapType[0]>().toEqualTypeOf<'foo' | 'bar'>();
    expectTypeOf<extractedMapType[1]>().toEqualTypeOf<1 | 2 | 3>();
  });

  it('Map이 아닌 경우 never를 반환해야 합니다.', () => {
    expectTypeOf<ExtractMapType<number>>().toEqualTypeOf<never>();
  });
});
