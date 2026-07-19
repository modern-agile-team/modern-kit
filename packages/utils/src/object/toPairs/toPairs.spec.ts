import { describe, it, expect, expectTypeOf } from 'vitest';
import { toPairs } from '.';

describe('toPairs', () => {
  describe('Set', () => {
    it('Set의 각 값을 [value, value] 형태의 쌍으로 반환해야 합니다.', () => {
      const set = new Set([1, 2, 3]);
      const result = toPairs(set);

      expect(result).toEqual([
        [1, 1],
        [2, 2],
        [3, 3],
      ]);
    });

    it('타입 추론이 정확해야 합니다.', () => {
      const set1 = new Set([1, 2, 3]);
      const result1 = toPairs(set1);
      expectTypeOf(result1).toEqualTypeOf<[number, number][]>();

      // as const
      const set2 = new Set(['b', 'a', 'c'] as const);
      const result2 = toPairs(set2);
      expectTypeOf(result2).toEqualTypeOf<
        ['b' | 'a' | 'c', 'b' | 'a' | 'c'][]
      >();
    });
  });

  describe('Map', () => {
    it('Map의 각 항목을 [key, value] 쌍으로 반환해야 합니다.', () => {
      const map = new Map([
        ['a', 1],
        ['b', 2],
      ]);
      const result = toPairs(map);

      expect(result).toEqual([
        ['a', 1],
        ['b', 2],
      ]);
    });

    it('타입 추론이 정확해야 합니다.', () => {
      const map1 = new Map([
        ['a', 1],
        ['b', 2],
      ]);
      const result1 = toPairs(map1);
      expectTypeOf(result1).toEqualTypeOf<[string, number][]>();

      // as const
      const map2 = new Map([
        ['b', 1],
        ['a', 2],
        ['c', 3],
      ] as const);
      const result2 = toPairs(map2);
      expectTypeOf(result2).toEqualTypeOf<['a' | 'b' | 'c', 1 | 2 | 3][]>();
    });
  });

  describe('객체(object)', () => {
    it('객체의 각 프로퍼티를 [key, value] 쌍으로 반환해야 합니다.', () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = toPairs(obj);

      expect(result).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    it('symbol key는 제외되어야 합니다.', () => {
      const obj = { a: 1, b: 2, c: 3, [Symbol('d')]: 4 };
      const result = toPairs(obj);

      expect(result).toEqual([
        ['a', 1],
        ['b', 2],
        ['c', 3],
      ]);
    });

    it('타입 추론이 정확해야 합니다.', () => {
      const obj1 = { a: 1, b: 2, c: 3 };
      const result1 = toPairs(obj1);
      expectTypeOf(result1).toEqualTypeOf<['a' | 'b' | 'c', number][]>();

      // as const
      const obj2 = { a: 1, b: 2, c: 3 } as const;
      const result2 = toPairs(obj2);
      expectTypeOf(result2).toEqualTypeOf<['a' | 'b' | 'c', 1 | 2 | 3][]>();

      // number key
      const obj3 = { 0: 1, 1: 2, 2: 3 } as const;
      const result3 = toPairs(obj3);
      expectTypeOf(result3).toEqualTypeOf<['0' | '1' | '2', 1 | 2 | 3][]>();
    });
  });

  describe('arrays', () => {
    it('배열이 전달되면 [index(string), number] 쌍으로 반환해야 합니다.', () => {
      const array = [1, 2, 3];
      const result = toPairs(array);

      expect(result).toEqual([
        ['0', 1],
        ['1', 2],
        ['2', 3],
      ]);
    });

    it('타입 추론이 정확해야 합니다.', () => {
      const array1 = [1, 2, 3];
      const result1 = toPairs(array1);
      expectTypeOf(result1).toEqualTypeOf<[string, number][]>();

      // as const
      const array2 = [1, 2, 3] as const;
      const result2 = toPairs(array2);
      expectTypeOf(result2).toEqualTypeOf<[string, 1 | 2 | 3][]>();
    });
  });

  describe('strings', () => {
    it('string이 전달되면 [index(string), char(string)] 쌍으로 반환해야 합니다.', () => {
      ['abc', Object('abc')].forEach((string) => {
        const result = toPairs(string);
        expect(result).toEqual([
          ['0', 'a'],
          ['1', 'b'],
          ['2', 'c'],
        ]);
      });
    });
  });

  describe('nullish', () => {
    it('undefined가 전달되면 빈 배열을 반환해야 합니다.', () => {
      expect(toPairs(null as any)).toEqual([]);
      expect(toPairs(undefined)).toEqual([]);
    });

    it('빈 객체가 전달되면 빈 배열을 반환해야 합니다.', () => {
      expect(toPairs({})).toEqual([]);
    });

    it('빈 Set이 전달되면 빈 배열을 반환해야 합니다.', () => {
      expect(toPairs(new Set())).toEqual([]);
    });

    it('빈 Map이 전달되면 빈 배열을 반환해야 합니다.', () => {
      expect(toPairs(new Map())).toEqual([]);
    });
  });
});
