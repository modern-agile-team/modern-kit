import { describe, it, expect } from 'vitest';
import { omit } from '.';

describe('omit', () => {
  it('객체에서 지정한 키를 제외한 객체를 반환해야 합니다', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['b', 'c']);

    expect(result).toEqual({ a: 1 });
  });

  it('모든 키를 제외하면 빈 객체를 반환해야 합니다', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, ['a', 'b', 'c']);

    expect(result).toEqual({});
  });

  it('제외할 키가 없으면 동일한 객체를 반환해야 합니다', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omit(obj, []);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });
});
