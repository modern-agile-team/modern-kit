import { describe, it, expect, expectTypeOf, vi } from 'vitest';
import { forEachObject } from '.';

describe('forEachObject', () => {
  it('객체의 각 key-value 쌍에 대해 삽입 순서대로 콜백을 호출해야 합니다.', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const callback = vi.fn();

    forEachObject(obj, callback);

    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback.mock.calls).toEqual([
      [1, 'a', obj],
      [2, 'b', obj],
      [3, 'c', obj],
    ]);
  });

  it('반환값이 없어야 합니다.', () => {
    const result = forEachObject({ a: 1 }, () => {});

    expect(result).toBeUndefined();
  });

  it('빈 객체의 경우 콜백을 호출하지 않아야 합니다.', () => {
    const callback = vi.fn();

    forEachObject({}, callback);

    expect(callback).not.toHaveBeenCalled();
  });

  it('상속된 프로퍼티와 symbol key 는 순회하지 않아야 합니다.', () => {
    const symbolKey = Symbol('s');
    const proto = { inherited: 0 };
    const obj = Object.assign(Object.create(proto), { own: 1, [symbolKey]: 2 });
    const keys: PropertyKey[] = [];

    forEachObject(obj, (_, key) => {
      keys.push(key);
    });

    expect(keys).toEqual(['own']);
  });

  it('콜백 인자의 타입이 추론되어야 합니다.', () => {
    const obj = { a: 1, b: 'two' };

    forEachObject(obj, (value, key, object) => {
      expectTypeOf(value).toEqualTypeOf<number | string>();
      expectTypeOf(key).toEqualTypeOf<'a' | 'b'>();
      expectTypeOf(object).toEqualTypeOf<typeof obj>();
    });
  });
});
