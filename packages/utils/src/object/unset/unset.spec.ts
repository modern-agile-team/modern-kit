import { describe, it, expect, expectTypeOf } from 'vitest';
import { unset } from '.';

describe('unset', () => {
  it('최상위 경로의 속성을 삭제할 수 있어야 합니다.', () => {
    const obj = { a: 1, b: 2 };

    const result = unset(obj, 'a');

    expect(result).toEqual({ b: 2 });
    expect('a' in result).toBe(false);
  });

  it('중첩된 경로의 속성을 삭제할 수 있어야 합니다.', () => {
    const obj = { a: { b: { c: 1, d: 2 } } };

    expect(unset(obj, 'a.b.c')).toEqual({ a: { b: { d: 2 } } });
    expect(unset(obj, 'a.b')).toEqual({ a: {} });
  });

  it('선택적 속성 경로를 통해 속성을 삭제할 수 있어야 합니다.', () => {
    type Obj = { a?: { b?: number; c: number } };
    const obj: Obj = { a: { b: 1, c: 2 } };

    const result = unset(obj, 'a?.b');

    expect(result).toEqual({ a: { c: 2 } });
  });

  it('경로 중간의 값이 없거나 객체가 아니면 그대로 반환해야 합니다.', () => {
    type Obj = { a?: { b?: number } };

    expect(unset({} as Obj, 'a?.b')).toEqual({});
    expect(unset({ a: null } as unknown as Obj, 'a?.b')).toEqual({ a: null });
    expect(unset({ a: 1 } as unknown as Obj, 'a?.b')).toEqual({ a: 1 });
  });

  it('존재하지 않는 속성을 삭제하면 그대로 반환해야 합니다.', () => {
    type Obj = { a: { b?: number; c: number } };
    const obj: Obj = { a: { c: 1 } };

    expect(unset(obj, 'a.b')).toEqual({ a: { c: 1 } });
  });

  it('기본적으로 원본 객체를 변경하지 않아야 합니다.', () => {
    const obj = { a: { b: 1, c: 2 } };

    const result = unset(obj, 'a.b');

    expect(result).not.toBe(obj);
    expect(result.a).not.toBe(obj.a);
    expect(obj).toEqual({ a: { b: 1, c: 2 } });
  });

  it('immutable 옵션이 false 이면 원본 객체에서 직접 삭제해야 합니다.', () => {
    const obj = { a: { b: 1, c: 2 } };

    const result = unset(obj, 'a.b', { immutable: false });

    expect(result).toBe(obj);
    expect(obj).toEqual({ a: { c: 2 } });
  });

  it('원본 객체와 같은 타입을 반환해야 합니다.', () => {
    const obj: { a: { b?: number } } = { a: { b: 1 } };

    const result = unset(obj, 'a.b');

    expectTypeOf(result).toEqualTypeOf<{ a: { b?: number } }>();
  });
});
