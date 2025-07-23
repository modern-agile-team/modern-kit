import { describe, expect, it } from 'vitest';
import { getInValue } from '.';

describe('getInValue', () => {
  it('주어진 키 경로에 해당하는 값을 반환해야 합니다.', () => {
    const obj = { a: { b: { c: 1 } } };

    expect(getInValue(obj, 'a')).toBe(obj.a);
    expect(getInValue(obj, 'a')).toEqual({ b: { c: 1 } });

    expect(getInValue(obj, 'a.b')).toBe(obj.a.b);
    expect(getInValue(obj, 'a.b')).toEqual({ c: 1 });

    expect(getInValue(obj, 'a.b.c')).toBe(obj.a.b.c);
    expect(getInValue(obj, 'a.b.c')).toBe(1);
  });

  it('주어진 키가 유효하지 않은 경로라면 undefined를 반환해야 합니다.', () => {
    const obj = { a: { b: { c: 1 } } };

    expect(getInValue(obj, 'a.b.d' as any)).toBe(undefined);
  });
});
