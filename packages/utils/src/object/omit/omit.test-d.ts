import { describe, expectTypeOf, it } from 'vitest';
import { omit } from '.';

describe('omit 함수', () => {
  it('객체에서 지정한 키를 제외한 객체 타입으로 추론되어야 합니다.', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['b', 'c']);

    expectTypeOf(result).toEqualTypeOf<{ a: number }>();
  });

  it('모든 키를 제외하면 빈 객체 타입으로 추론되어야 합니다.', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['a', 'b', 'c']);

    expectTypeOf(result).toEqualTypeOf<{}>();
  });

  it('제외할 키가 없으면 동일한 객체 타입으로 추론되어야 합니다.', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, []);

    expectTypeOf(result).toEqualTypeOf<{ a: number; b: number; c: number }>();
  });
});
