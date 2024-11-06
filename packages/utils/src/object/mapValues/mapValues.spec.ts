import { describe, it, expect, expectTypeOf } from 'vitest';
import { mapValues } from '.';

describe('mapValues', () => {
  it('age 값을 추출하여 이를 value로 가진 객체를 반환해야 합니다.', () => {
    const users = {
      fred: { user: 'fred', age: 40 },
      pebbles: { user: 'pebbles', age: 1 },
    };
    const expected = { fred: 40, pebbles: 1 };

    const result = mapValues(users, ({ value }) => value.age);

    expect(mapValues(users, ({ value }) => value.age)).toEqual(expected);

    // type
    expectTypeOf(result).toEqualTypeOf<Record<'fred' | 'pebbles', number>>();
  });

  it('대문자로 변형된 value를 가진 객체를 반환해야 합니다.', () => {
    const obj = { a: 'apple', b: 'banana', c: 'cherry' } as const;
    const expected = { a: 'APPLE', b: 'BANANA', c: 'CHERRY' } as const;

    const result = mapValues(obj, ({ value }) => value.toUpperCase());

    expect(result).toEqual(expected);

    // type
    expectTypeOf(result).toEqualTypeOf<Record<'a' | 'b' | 'c', string>>();
  });

  it('빈 객체의 경우 빈 객체를 반환해야 합니다.', () => {
    const obj = {};
    const expected = {};

    const result = mapValues(obj, ({ value }: { value: string }) => value);

    expect(result).toEqual(expected);
  });
});
