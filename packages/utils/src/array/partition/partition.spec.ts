import { describe, it, expect } from 'vitest';
import { partition } from '.';

describe('partition', () => {
  it('숫자 배열을 조건에 따라 분할해야 합니다', () => {
    const arr = [1, 2, 3, 4, 5];
    const [evens, odds] = partition(arr, (num) => num % 2 === 0);

    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([1, 3, 5]);
  });

  it('문자열 배열을 조건에 따라 분할해야 합니다', () => {
    const arr = ['apple', 'banana', 'cherry', 'date'];
    const [longer, shorter] = partition(arr, (str) => str.length > 5);

    expect(longer).toEqual(['banana', 'cherry']);
    expect(shorter).toEqual(['apple', 'date']);
  });

  it('빈 배열을 처리해야 합니다', () => {
    const arr: number[] = [];
    const [evens, odds] = partition(arr, (num) => num % 2 === 0);

    expect(evens).toEqual([]);
    expect(odds).toEqual([]);
  });

  it('객체 배열을 조건에 따라 분할해야 합니다', () => {
    const users = [
      { user: 'barney', age: 36, active: false },
      { user: 'fred', age: 40, active: true },
      { user: 'pebbles', age: 1, active: false },
    ];

    const [activeUsers, inActiveUsers] = partition(
      users,
      (item) => item.active
    );

    expect(activeUsers).toEqual([{ user: 'fred', age: 40, active: true }]);
    expect(inActiveUsers).toEqual([
      { user: 'barney', age: 36, active: false },
      { user: 'pebbles', age: 1, active: false },
    ]);
  });
});
