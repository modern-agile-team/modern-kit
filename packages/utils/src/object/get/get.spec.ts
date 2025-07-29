import { describe, expect, it, expectTypeOf } from 'vitest';
import { get } from '.';

describe('get', () => {
  it('주어진 키 경로에 해당하는 값을 반환해야 합니다.', () => {
    const obj: { a: { b: { c: number } } } = { a: { b: { c: 1 } } };

    const aValue = get(obj, 'a');
    expect(aValue).toBe(obj.a);
    expect(aValue).toEqual({ b: { c: 1 } });

    const bValue = get(obj, 'a.b');
    expect(bValue).toBe(obj.a.b);
    expect(bValue).toEqual({ c: 1 });

    const cValue = get(obj, 'a.b.c');
    expect(cValue).toBe(obj.a.b.c);
    expect(cValue).toBe(1);
  });

  it('주어진 객체 타입에 옵셔널 키가 있는 경우, 옵셔널(?) 경로를 허용해야 합니다.', () => {
    const obj: { a: { b?: { c: number } } } = { a: { b: { c: 1 } } };

    const aValue = get(obj, 'a');
    expect(aValue).toBe(obj.a);
    expect(aValue).toEqual({ b: { c: 1 } });

    const bValue = get(obj, 'a.b');
    expect(bValue).toBe(obj.a.b);
    expect(bValue).toEqual({ c: 1 });

    const cValue = get(obj, 'a.b?.c');
    expect(cValue).toBe(obj.a.b?.c);
    expect(cValue).toEqual(1);
  });

  it('주어진 키 경로에 해당하는 값이 존재하지 않을 경우, 기본값을 반환해야 합니다.', () => {
    const obj: { a?: { b?: { c?: number } } } = {};

    expect(get(obj, 'a', { b: { c: 1 } })).toEqual({ b: { c: 1 } });
    expect(get(obj, 'a?.b', { c: 1 })).toEqual({ c: 1 });
    expect(get(obj, 'a?.b?.c', 1)).toBe(1);
  });

  it('주어진 키가 유효하지 않은 경로라면 undefined를 반환해야 합니다.', () => {
    const obj = { a: { b: { c: 1 } } };

    expect(get(obj, 'a.b.d' as any)).toBeUndefined();
  });
});
