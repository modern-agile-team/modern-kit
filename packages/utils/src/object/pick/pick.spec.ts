import { describe, it, expect, expectTypeOf } from 'vitest';
import { pick } from '.';

describe('pick', () => {
  it('객체에서 여러 키를 추출하여 새로운 객체를 반환해야 한다', () => {
    const inputObj = { a: 1, b: 2, c: 3 };
    const pickedObj = pick(inputObj, ['b', 'c']);

    expect(pickedObj).toEqual({ b: 2, c: 3 });

    // type
    expectTypeOf(pickedObj).toEqualTypeOf<{ b: number; c: number }>();
  });

  it('깊은 복사된 새로운 객체를 반환해야 한다', () => {
    const inputObj = { a: 1, b: { x: 2, y: 3 }, c: 4 };
    const pickedObj = pick(inputObj, ['b']);

    expect(pickedObj.b).not.toBe(inputObj.b);
    expect(pickedObj.b).toEqual(inputObj.b);
  });
});
