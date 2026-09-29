import { describe, it, expect, expectTypeOf } from 'vitest';
import { sortKeys } from '.';

describe('sortKeys', () => {
  it('key 를 오름차순으로 정렬한 새 객체를 반환해야 합니다.', () => {
    const original = { c: 3, a: 1, b: 2 };
    const result = sortKeys(original);

    expect(Object.keys(original)).toEqual(['c', 'a', 'b']);
    expect(Object.keys(result)).toEqual(['a', 'b', 'c']);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('중첩된 객체의 key 는 정렬하지 않아야 합니다.', () => {
    const original = { b: { y: 1, x: 2 }, a: 1 };
    const result = sortKeys(original);

    expect(Object.keys(original)).toEqual(['b', 'a']);
    expect(Object.keys(result)).toEqual(['a', 'b']);
    expect(Object.keys(result.b)).toEqual(['y', 'x']);
  });

  it('comparator 함수로 정렬 순서를 지정할 수 있어야 합니다.', () => {
    const result = sortKeys({ a: 1, c: 3, b: 2 }, (a, b) => b.localeCompare(a));

    expect(Object.keys(result)).toEqual(['c', 'b', 'a']);
  });

  it('정수 key 를 숫자 오름차순으로 먼저 두고, 문자열 key 를 뒤에 정렬해야 합니다.', () => {
    const result = sortKeys({ b: 1, 10: 1, a: 1, 2: 1, 1: 1 });

    // 문자열 정렬이라면 '10' 이 '2' 보다 앞이지만, 정수 key 는 숫자 순서로 나열됩니다.
    expect(Object.keys(result)).toEqual(['1', '2', '10', 'a', 'b']);
  });

  it('comparator 로 역순 정렬해도 정수 key 는 오름차순으로 앞에 위치해야 합니다.', () => {
    const result = sortKeys({ a: 1, 1: 1, b: 1, 2: 1 }, (a, b) =>
      b.localeCompare(a)
    );

    expect(Object.keys(result)).toEqual(['1', '2', 'b', 'a']);
  });

  it('원본 객체를 변경하지 않고, 중첩된 값은 같은 참조를 유지해야 합니다.', () => {
    const obj = { b: { d: 1, c: 2 }, a: 1 };

    const result = sortKeys(obj);

    expect(result).not.toBe(obj);
    expect(result.b).toBe(obj.b);
    expect(Object.keys(obj)).toEqual(['b', 'a']);
  });

  it('원본 객체와 같은 타입을 반환해야 합니다.', () => {
    const obj = { b: 'x', a: 1 };

    expectTypeOf(sortKeys(obj)).toEqualTypeOf<{ b: string; a: number }>();
  });
});
