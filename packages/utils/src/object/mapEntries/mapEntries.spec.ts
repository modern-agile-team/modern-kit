import { describe, it, expect, expectTypeOf } from 'vitest';
import { mapEntries } from '.';

describe('mapEntries', () => {
  it('key 와 value 를 함께 변환한 새 객체를 반환해야 합니다.', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const expected = { A: 10, B: 20, C: 30 };

    const result = mapEntries(obj, ({ key, value }) => [
      key.toUpperCase(),
      value * 10,
    ]);

    expect(result).toEqual(expected);

    // type
    expectTypeOf(result).toEqualTypeOf<Record<string, number>>();
  });

  it('key 와 value 를 서로 바꿀 수 있어야 합니다.', () => {
    const obj = { fred: 'admin', pebbles: 'guest' } as const;
    const expected = { admin: 'fred', guest: 'pebbles' };

    const result = mapEntries(obj, ({ key, value }) => [value, key]);

    expect(result).toEqual(expected);

    // type
    expectTypeOf(result).toEqualTypeOf<
      Record<'admin' | 'guest', 'fred' | 'pebbles'>
    >();
  });

  it('iteratee 에 원본 객체를 전달해야 합니다.', () => {
    const obj = { a: 1, b: 2 };
    const received: unknown[] = [];

    mapEntries(obj, ({ key, value, obj: source }) => {
      received.push(source);
      return [key, value];
    });

    expect(received).toEqual([obj, obj]);
  });

  it('변환된 key 가 겹치면 나중에 순회한 값으로 덮어써야 합니다.', () => {
    const obj = { a: 1, b: 2 };

    const result = mapEntries(obj, ({ value }) => ['same', value]);

    expect(result).toEqual({ same: 2 });
  });

  it('원본 객체를 변경하지 않아야 합니다.', () => {
    const obj = { a: 1 };

    mapEntries(obj, ({ key, value }) => [`${key}_new`, value + 1]);

    expect(obj).toEqual({ a: 1 });
  });

  it('빈 객체의 경우 빈 객체를 반환해야 합니다.', () => {
    const result = mapEntries({}, ({ key, value }) => [key, value]);

    expect(result).toEqual({});
  });
});
