import { describe, it, expect, expectTypeOf } from 'vitest';
import { mapKeys } from '.';

describe('mapKeys', () => {
  it('key와 value를 붙인 key를 가진 객체를 반환해야 합니다.', () => {
    const obj = { a: 1, b: 2 } as const;
    const expected = { a1: 1, b2: 2 } as const;
    const result = mapKeys(obj, ({ key, value }) => `${key}${value}`);

    expect(result).toEqual(expected);

    // type
    expectTypeOf(result).toEqualTypeOf<
      Record<'a1' | 'a2' | 'b1' | 'b2', 1 | 2>
    >();
  });

  it('대문자로 변형된 key를 가진 객체를 반환해야 합니다.', () => {
    const obj = { a: 'apple', b: 'banana', c: 'cherry' } as const;
    const expected = { A: 'apple', B: 'banana', C: 'cherry' } as const;

    const result = mapKeys(obj, ({ key }) => key.toString().toUpperCase());

    expect(result).toEqual(expected);

    // type
    expectTypeOf(result).toEqualTypeOf<
      Record<string, 'apple' | 'banana' | 'cherry'>
    >();
  });

  it('빈 객체의 경우 빈 객체를 반환해야 합니다.', () => {
    const obj = {} as const;

    const expected = {} as const;

    const result = mapKeys(obj, ({ key }: { key: string }) => key.toString());

    expect(result).toEqual(expected);
  });
});
