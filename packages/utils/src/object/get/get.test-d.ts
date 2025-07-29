import { describe, it, expectTypeOf } from 'vitest';
import { get } from '.';

describe('get', () => {
  it('주어진 키 경로에 해당하는 값을 반환해야 합니다.', () => {
    const obj: { a: { b: { c: number } } } = { a: { b: { c: 1 } } };

    const aValue = get(obj, 'a');
    expectTypeOf(aValue).toEqualTypeOf<{ b: { c: number } }>();

    const bValue = get(obj, 'a.b');
    expectTypeOf(bValue).toEqualTypeOf<{ c: number }>();

    const cValue = get(obj, 'a.b.c');
    expectTypeOf(cValue).toEqualTypeOf<number>();
  });

  it('주어진 객체 타입에 옵셔널 키가 있는 경우, "?"를 포함한 경로를 허용하며, 반환 타입에 undefined를 포함해야 합니다.', () => {
    const obj: { a: { b?: { c: number } } } = { a: { b: { c: 1 } } };

    const aValue = get(obj, 'a');
    expectTypeOf(aValue).toEqualTypeOf<{
      b?:
        | {
            c: number;
          }
        | undefined;
    }>();

    const bValue = get(obj, 'a.b');
    expectTypeOf(bValue).toEqualTypeOf<{ c: number } | undefined>();

    const cValue = get(obj, 'a.b?.c');
    expectTypeOf(cValue).toEqualTypeOf<number | undefined>();
  });
});
