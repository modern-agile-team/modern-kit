import { describe, it, expect, expectTypeOf } from 'vitest';
import { sortKeysDeep } from '.';

describe('sortKeysDeep', () => {
  it('중첩된 객체의 key 까지 정렬해야 합니다.', () => {
    const result = sortKeysDeep({ b: { y: { q: 1, p: 2 }, x: 2 }, a: 1 });

    expect(Object.keys(result)).toEqual(['a', 'b']);
    expect(Object.keys(result.b)).toEqual(['x', 'y']);
    expect(Object.keys(result.b.y)).toEqual(['p', 'q']);
  });

  it('배열 순서는 유지하고 배열 안의 객체 key 를 정렬해야 합니다.', () => {
    const result = sortKeysDeep({
      list: [{ d: 1, c: 2 }, 3, [{ f: 1, e: 2 }]],
    });

    expect(result).toEqual({ list: [{ c: 2, d: 1 }, 3, [{ e: 2, f: 1 }]] });
    expect(Object.keys(result.list[0] as object)).toEqual(['c', 'd']);
  });

  it('순수 객체가 아닌 값(Date, Map 등)은 그대로 유지해야 합니다.', () => {
    const date = new Date();
    const map = new Map([['b', 1]]);

    const result = sortKeysDeep({ b: date, a: map });

    expect(result.b).toBe(date);
    expect(result.a).toBe(map);
  });

  it('comparator 함수를 모든 깊이에 적용해야 합니다.', () => {
    const result = sortKeysDeep({ a: { x: 1, y: 2 }, b: 1 }, (a, b) =>
      b.localeCompare(a)
    );

    expect(Object.keys(result)).toEqual(['b', 'a']);
    expect(Object.keys(result.a)).toEqual(['y', 'x']);
  });

  it('key 순서가 다른 객체도 같은 문자열로 직렬화되어야 합니다.', () => {
    const a = { page: 1, filter: { status: 'ON', category: 5 } };
    const b = { filter: { category: 5, status: 'ON' }, page: 1 };

    expect(JSON.stringify(sortKeysDeep(a))).toBe(
      JSON.stringify(sortKeysDeep(b))
    );
  });

  it('중첩된 객체에서도 정수 key 를 숫자 오름차순으로 먼저 두고 문자열 key 를 정렬해야 합니다.', () => {
    const result = sortKeysDeep({
      b: { z: 1, 10: 1, y: 1, 2: 1 },
      1: [{ c: 1, 3: 1, a: 1 }],
      a: 1,
    });

    expect(Object.keys(result)).toEqual(['1', 'a', 'b']);
    expect(Object.keys(result.b)).toEqual(['2', '10', 'y', 'z']);
    expect(Object.keys(result[1][0])).toEqual(['3', 'a', 'c']);
  });

  it('원본 객체를 변경하지 않아야 합니다.', () => {
    const obj = { b: { d: 1, c: 2 }, a: 1 };

    const result = sortKeysDeep(obj);

    expect(result).not.toBe(obj);
    expect(result.b).not.toBe(obj.b);
    expect(Object.keys(obj)).toEqual(['b', 'a']);
    expect(Object.keys(obj.b)).toEqual(['d', 'c']);
  });

  it('원본 객체와 같은 타입을 반환해야 합니다.', () => {
    const obj = { b: { y: 'x' }, a: 1 };

    expectTypeOf(sortKeysDeep(obj)).toEqualTypeOf<{
      b: { y: string };
      a: number;
    }>();
  });
});
