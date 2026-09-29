import { describe, expect, it } from 'vitest';
import { keyBy } from '.';

describe('keyBy', () => {
  it('배열의 각 요소를 문자열 키로 맵핑해야 한다', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'jake', age: 30 },
    ];

    const result = keyBy(people, (person) => person.name);

    expect(result).toEqual({
      mike: { name: 'mike', age: 20 },
      jake: { name: 'jake', age: 30 },
    });
  });

  it('배열의 각 요소를 숫자 키로 맵핑해야 한다', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'jake', age: 30 },
    ];

    const result = keyBy(people, (person) => person.age);
    expect(result).toEqual({
      20: { name: 'mike', age: 20 },
      30: { name: 'jake', age: 30 },
    });
  });

  it('배열의 각 요소를 Symbol 키로 맵핑해야 한다', () => {
    const id1 = Symbol('id');
    const id2 = Symbol('id');
    const people = [
      { id: id1, name: 'mike', age: 20 },
      { id: id2, name: 'jake', age: 30 },
    ];

    const result = keyBy(people, (person) => person.id);
    expect(result).toEqual({
      [id1]: { id: id1, name: 'mike', age: 20 },
      [id2]: { id: id2, name: 'jake', age: 30 },
    });
  });

  it('동일한 키가 있을 경우 마지막 값을 사용해야 한다', () => {
    const people = [
      { name: 'mike', age: 20 },
      { name: 'mike', age: 30 },
    ];

    const result = keyBy(people, (person) => person.name);

    expect(result).toEqual({ mike: { name: 'mike', age: 30 } });
  });

  it('키 생성 함수에 index가 전달되어야 한다', () => {
    const items = ['a', 'b', 'c'];
    const result = keyBy(items, (_, index) => index);

    expect(result).toEqual({ 0: 'a', 1: 'b', 2: 'c' });
  });

  it('키 생성 함수에 전체 배열이 전달되어야 한다', () => {
    const items = [10, 20, 30];
    const result = keyBy(items, (item, _, arr) =>
      item > arr[0] ? 'large' : 'small'
    );

    expect(result).toEqual({ small: 10, large: 30 });
  });

  it('빈 배열인 경우 빈 object를 반환해야 한다', () => {
    const people: Array<{ name: string; age: number }> = [];

    const result = keyBy(people, (person) => person.name);

    expect(result).toEqual({});
  });
});
