import { describe, it, expect, expectTypeOf } from 'vitest';
import { invert } from '.';

describe('invert', () => {
  it('키와 값이 반전된 새로운 객체를 반환해야 합니다.', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = invert(obj);

    expect(result).toEqual({ 1: 'a', 2: 'b', 3: 'c' });

    // type
    expectTypeOf(result).toEqualTypeOf<Record<number, 'a' | 'b' | 'c'>>();
  });

  it('iteratee가 제공된 경우 반환 값을 기반으로 key를 설정해야 합니다.(1)', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = invert(obj, ({ value }) => `key_${value}`);

    expect(result).toEqual({ key_1: 'a', key_2: 'b', key_3: 'c' });

    // type
    expectTypeOf(result).toEqualTypeOf<
      Record<`key_${number}`, 'a' | 'b' | 'c'>
    >();
  });

  it('iteratee가 제공된 경우 반환 값을 기반으로 key를 설정해야 합니다.(2)', () => {
    const obj = {
      a: { name: 'foo' },
      b: { name: 'bar' },
    } as const;
    const result = invert(obj, ({ value, key }) => `${key}_${value.name}`);

    expect(result).toEqual({ a_foo: 'a', b_bar: 'b' });

    // type
    expectTypeOf(result).toEqualTypeOf<
      Record<'a_foo' | 'a_bar' | 'b_foo' | 'b_bar', 'a' | 'b'>
    >();
  });

  it('중복 값이 있는 객체를 처리해야 합니다.', () => {
    const obj = { a: 1, b: 1, c: 2 };
    const result = invert(obj);

    expect(result).toEqual({ 1: 'b', 2: 'c' });
  });

  it('빈 객체를 처리해야 합니다.', () => {
    const obj = {};
    const result = invert(obj);

    expect(result).toEqual({});
  });

  it('객체에 직접 있지 않은 프로퍼티는 건너뛰어야 합니다.', () => {
    const obj = Object.create({ inherited: 'inherited' });
    obj.a = 1;
    obj.b = 2;
    const result = invert(obj);

    expect(result).toEqual({ 1: 'a', 2: 'b' });
  });
});
