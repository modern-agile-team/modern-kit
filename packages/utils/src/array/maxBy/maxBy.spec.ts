import { describe, expect, it } from 'vitest';
import { maxBy } from '.';

describe('maxBy', () => {
  it('maxBy는 배열에서 하나의 최대값을 선택한다', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 20 },
    ];
    const result = maxBy(people, (person) => person.age);
    expect(result).toEqual({ name: 'Nunu', age: 30 });
  });

  it('최대값이 두 개 있을 경우, 첫 번째 값을 선택한다', () => {
    const people = [
      { name: 'Mark', age: 25 },
      { name: 'Nunu', age: 30 },
      { name: 'Overmars', age: 30 },
    ];
    const result = maxBy(people, (person) => person.age);
    expect(result).toEqual({ name: 'Nunu', age: 30 });
  });

  it('배열에 요소가 하나만 있을 경우, 그 값을 반환한다', () => {
    const people = [{ name: 'Mark', age: 25 }];
    const result = maxBy(people, (person) => person.age);
    expect(result).toEqual({ name: 'Mark', age: 25 });
  });

  it('배열이 비어있으면 undefined를 반환한다', () => {
    type Person = { name: string; age: number };
    const people: Person[] = [];
    const result = maxBy(people, (person) => person.age);
    expect(result).toBeUndefined();
  });

  it('배열의 요소가 모두 음수일 경우에도 가장 큰 값을 반환한다', () => {
    const people = [
      { name: 'Mark', age: -25 },
      { name: 'Nunu', age: -30 },
      { name: 'Overmars', age: -20 },
    ];
    const result = maxBy(people, (person) => person.age);
    expect(result).toEqual({ name: 'Overmars', age: -20 });
  });

  it('NaN이 포함되어 있으면, 위치에 상관없이 NaN을 반환해야 한다', () => {
    expect(maxBy([Number.NaN, 1, 3, 2], (x) => x)).toBeNaN();
    expect(maxBy([1, Number.NaN, 3, 2], (x) => x)).toBeNaN();
    expect(maxBy([1, 3, 2, Number.NaN], (x) => x)).toBeNaN();
  });

  it('iteratee 함수에 index 파라미터가 전달되어야 한다', () => {
    const items = [{ value: 10 }, { value: 20 }, { value: 15 }];
    const result = maxBy(items, (item, index) => item.value + index);
    expect(result).toEqual({ value: 20 });
  });

  it('iteratee 함수에 array 파라미터가 전달되어야 한다', () => {
    const items = [{ value: 10 }, { value: 20 }, { value: 15 }];
    const result = maxBy(
      items,
      (item, _index, array) => item.value * array.length
    );
    expect(result).toEqual({ value: 20 });
  });
});
