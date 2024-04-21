import { describe, expectTypeOf, it } from 'vitest';
import { IndexSignature } from '.';

describe('IndexSignature', () => {
  it('객체가 가질 수 있는 프로퍼티를 동적으로 추가할 수 있게 허용합니다. value의 타입은 제네릭으로 넣어준 타입입니다.', () => {
    const test: IndexSignature<string> = { foo: 'foo', bar: 'bar' };
    test.test = '1';

    expectTypeOf(test).toEqualTypeOf<{ [key: PropertyKey]: string }>();
  });
});
