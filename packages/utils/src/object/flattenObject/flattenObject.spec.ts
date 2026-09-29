import { describe, it, expect } from 'vitest';
import { flattenObject } from '.';

describe('flattenObject', () => {
  it('중첩된 객체를 점(.)으로 이어진 경로를 key 로 평탄화해야 합니다.', () => {
    const result = flattenObject({
      product: { id: 123, category: { id: 5, name: '의류' } },
      seller: { grade: 'gold' },
    });

    expect(result).toEqual({
      'product.id': 123,
      'product.category.id': 5,
      'product.category.name': '의류',
      'seller.grade': 'gold',
    });
  });

  it('이미 평평한 객체는 같은 key-value 를 가진 새 객체를 반환해야 합니다.', () => {
    const obj = { a: 1, b: 'x' };

    const result = flattenObject(obj);

    expect(result).toEqual(obj);
    expect(result).not.toBe(obj);
  });

  it('배열은 인덱스를 key 로 평탄화해야 합니다.', () => {
    const result = flattenObject({
      tags: ['a', 'b'],
      options: [{ color: 'black' }, { color: 'white' }],
    });

    expect(result).toEqual({
      'tags.0': 'a',
      'tags.1': 'b',
      'options.0.color': 'black',
      'options.1.color': 'white',
    });
  });

  it('구분자를 지정할 수 있어야 합니다.', () => {
    const result = flattenObject({ a: { b: { c: 1 } }, d: [1] }, '_');

    expect(result).toEqual({ a_b_c: 1, d_0: 1 });
  });

  it('빈 객체와 빈 배열은 값 그대로 유지해야 합니다.', () => {
    const result = flattenObject({ a: {}, b: [], c: { d: {} } });

    expect(result).toEqual({ a: {}, b: [], 'c.d': {} });
  });

  it('null, undefined 와 원시값은 그대로 유지해야 합니다.', () => {
    const result = flattenObject({
      a: { b: null, c: undefined, d: 0, e: false, f: '' },
    });

    expect(result).toEqual({
      'a.b': null,
      'a.c': undefined,
      'a.d': 0,
      'a.e': false,
      'a.f': '',
    });
    expect('a.c' in result).toBe(true);
  });

  it('순수 객체가 아닌 값(Date, Map, Set 등)은 펼치지 않고 그대로 유지해야 합니다.', () => {
    const date = new Date(0);
    const map = new Map([['a', 1]]);
    const set = new Set([1]);

    const result = flattenObject({ a: { date, map, set } });

    expect(result['a.date']).toBe(date);
    expect(result['a.map']).toBe(map);
    expect(result['a.set']).toBe(set);
  });

  it('클래스 인스턴스는 펼치지 않고 그대로 유지해야 합니다.', () => {
    class Point {
      x = 1;
    }
    const point = new Point();

    const result = flattenObject({ a: { point } });

    expect(result).toEqual({ 'a.point': point });
    expect(result['a.point']).toBe(point);
  });

  it('원본 객체를 변경하지 않아야 합니다.', () => {
    const obj = { a: { b: 1 }, c: [1, 2] };

    flattenObject(obj);

    expect(obj).toEqual({ a: { b: 1 }, c: [1, 2] });
  });

  it('빈 객체의 경우 빈 객체를 반환해야 합니다.', () => {
    expect(flattenObject({})).toEqual({});
  });
});
