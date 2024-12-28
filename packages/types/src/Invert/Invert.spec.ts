import { describe, it, expectTypeOf } from 'vitest';
import { Invert } from '.';

describe('Invert', () => {
  it('객체의 key와 value를 서로 바꾼 새로운 타입을 반환해야 합니다.', () => {
    const originObj = { foo: 'a', bar: 'b' } as const;

    const invertedObj: Invert<typeof originObj> = { a: 'foo', b: 'bar' };

    expectTypeOf(invertedObj).toEqualTypeOf<{
      readonly a: 'foo';
      readonly b: 'bar';
    }>();
  });
});
