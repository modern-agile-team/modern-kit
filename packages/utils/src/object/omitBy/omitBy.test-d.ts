import { describe, it, expectTypeOf } from 'vitest';
import { omitBy } from '.';

describe('omitBy', () => {
  it('주어진 객체가 프로퍼티들이 옵셔닝된 객체 타입으로 추론되어야 합니다.', () => {
    const inputObj = { a: 1, b: '', c: undefined, d: null, e: 'str' };
    const omittedObj = omitBy(inputObj, (value) => !value);

    expectTypeOf(omittedObj).toEqualTypeOf<
      Partial<{
        a: number;
        b: string;
        c: undefined;
        d: null;
        e: string;
      }>
    >();
  });
});
