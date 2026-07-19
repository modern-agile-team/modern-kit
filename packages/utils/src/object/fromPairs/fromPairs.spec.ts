import { describe, it, expect, expectTypeOf } from 'vitest';
import { fromPairs } from '.';
import { toPairs } from '../toPairs';

describe('fromPairs', () => {
  it('[key, value] 쌍의 배열을 객체로 변환해야 합니다.', () => {
    const result = fromPairs([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('toPairs와 fromPairs는 라운드 트리핑(왕복)을 보장합니다.', () => {
    const result = fromPairs(toPairs({ a: 1, b: 2, c: 3 }));

    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('빈 배열은 빈 객체를 반환해야 합니다.', () => {
    expect(fromPairs([])).toEqual({});
  });

  it('키가 중복되면 마지막 값으로 덮어써야 합니다.', () => {
    const result = fromPairs([
      ['a', 1],
      ['a', 2],
      ['a', 3],
    ]);

    expect(result).toEqual({ a: 3 });
  });

  it('타입 추론이 정확해야 합니다.', () => {
    const result1 = fromPairs([
      ['a', 1],
      ['b', 2],
    ]);
    expectTypeOf(result1).toEqualTypeOf<Record<string, number>>();

    const result2 = fromPairs([
      ['a', 1],
      ['b', 'x'],
    ]);
    expectTypeOf(result2).toEqualTypeOf<Record<string, string | number>>();

    const result3 = fromPairs([
      ['a', 1],
      ['b', 2],
    ] as const);
    expectTypeOf(result3).toEqualTypeOf<Record<'a' | 'b', 1 | 2>>();
  });
});
