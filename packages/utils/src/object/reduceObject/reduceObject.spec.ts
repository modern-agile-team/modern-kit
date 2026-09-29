import { describe, it, expect } from 'vitest';
import { reduceObject } from '.';

describe('reduceObject', () => {
  it('모든 value 를 누적한 결과를 반환해야 합니다.', () => {
    const cart = { apple: 1000, banana: 2000, cherry: 3000 };

    const result = reduceObject(cart, (sum, { value }) => sum + value, 0);

    expect(result).toBe(6000);
  });

  it('key 와 value 를 삽입 순서대로 reducer 에 전달해야 합니다.', () => {
    const params = { page: 1, size: 20 };

    const result = reduceObject(
      params,
      (acc, { key, value }) => [...acc, `${String(key)}=${value}`],
      [] as string[]
    );

    expect(result).toEqual(['page=1', 'size=20']);
  });

  it('누적값을 다른 형태의 객체로 만들 수 있어야 합니다.', () => {
    const scores = { fred: 80, pebbles: 45, barney: 92 };

    const result = reduceObject(
      scores,
      (acc, { key, value }) => {
        acc[value >= 60 ? 'pass' : 'fail'].push(key);
        return acc;
      },
      {
        pass: [] as (keyof typeof scores)[],
        fail: [] as (keyof typeof scores)[],
      }
    );

    expect(result).toEqual({ pass: ['fred', 'barney'], fail: ['pebbles'] });
  });

  it('reducer 에 원본 객체를 전달해야 합니다.', () => {
    const obj = { a: 1, b: 2 };

    const result = reduceObject(
      obj,
      (acc, { obj: source }) => [...acc, source],
      [] as unknown[]
    );

    expect(result).toEqual([obj, obj]);
  });

  it('빈 객체의 경우 초기값을 그대로 반환해야 합니다.', () => {
    const initialValue = { count: 0 };

    const result = reduceObject({}, (acc) => acc, initialValue);

    expect(result).toBe(initialValue);
  });
});
