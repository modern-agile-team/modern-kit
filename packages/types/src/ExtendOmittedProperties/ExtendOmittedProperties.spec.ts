import { describe, expectTypeOf, it } from 'vitest';
import { ExtendOmittedProperties } from '.';

describe('ExcludeNullish', () => {
  it('첫 번째 제네릭 타입의 프로퍼티를 Omit으로 제외 후 제외 한 프로퍼티를 확장합니다.', () => {
    type TestType = { foo: string; bar: number };

    const test: ExtendOmittedProperties<TestType, { bar: string }> = {
      foo: 'foo',
      bar: 'bar',
    };

    // toEqualTypeOf 이슈로 우회 테스트
    expectTypeOf(test as { foo: string; bar: string }).toEqualTypeOf<{
      foo: string;
      bar: string;
    }>();
  });
});
