import { describe, expect, it } from 'vitest';
import { minBy } from '.';

describe('minBy', () => {
  it('배열에서 최소값을 가진 요소를 선택한다', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 35 },
    ];
    const result = minBy(people, (person) => person.age);
    expect(result).toEqual({ name: 'Nunu', age: 20 });
  });

  it('동일한 최소값이 여러 개면 첫 번째 요소를 반환한다', () => {
    const people = [
      { name: 'Mark', age: 30 },
      { name: 'Nunu', age: 20 },
      { name: 'Overmars', age: 20 },
    ];
    const result = minBy(people, (person) => person.age);
    expect(result).toEqual({ name: 'Nunu', age: 20 });
  });

  it('배열에 요소가 하나만 있을 때는 그 요소를 반환한다', () => {
    const people = [{ name: 'Mark', age: 25 }];
    const result = minBy(people, (person) => person.age);
    expect(result).toEqual({ name: 'Mark', age: 25 });
  });

  it('배열의 요소가 모두 음수일 경우에도 가장 작은 값을 반환한다', () => {
    const people = [
      { name: 'Mark', age: -25 },
      { name: 'Nunu', age: -30 },
      { name: 'Overmars', age: -20 },
    ];
    const result = minBy(people, (person) => person.age);
    expect(result).toEqual({ name: 'Nunu', age: -30 });
  });

  it('빈 배열일 경우 undefined를 반환한다', () => {
    type Person = { name: string; age: number };
    const people: Person[] = [];
    const result = minBy(people, (person) => person.age);
    expect(result).toBeUndefined();
  });

  it('NaN이 포함되어 있으면 어디에 있든 NaN을 반환한다.', () => {
    expect(minBy([Number.NaN, 3, 1, 2], (x) => x)).toBeNaN();
    expect(minBy([3, Number.NaN, 1, 2], (x) => x)).toBeNaN();
    expect(minBy([3, 1, 2, Number.NaN], (x) => x)).toBeNaN();
  });

  it('iteratee 함수에 index 값이 제대로 전달된다', () => {
    const items = [{ value: 10 }, { value: 20 }, { value: 15 }];
    const result = minBy(items, (item, index) => item.value + index);
    expect(result).toEqual({ value: 10 });
  });

  it('iteratee 함수에 array 값이 제대로 전달된다', () => {
    const items = [{ value: 10 }, { value: 20 }, { value: 15 }];
    const result = minBy(
      items,
      (item, _index, array) => item.value * array.length
    );
    expect(result).toEqual({ value: 10 });
  });
});
