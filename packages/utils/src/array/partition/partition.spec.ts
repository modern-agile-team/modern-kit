import { describe, it, expect } from 'vitest';
import { partition } from '.';

describe('partition', () => {
  it('should partition an array of numbers based on a predicate', () => {
    const arr = [1, 2, 3, 4, 5];
    const [evens, odds] = partition(arr, (num) => num % 2 === 0);

    expect(evens).toEqual([2, 4]);
    expect(odds).toEqual([1, 3, 5]);
  });

  it('should partition an array of strings based on a predicate', () => {
    const arr = ['apple', 'banana', 'cherry', 'date'];
    const [longer, shorter] = partition(arr, (str) => str.length > 5);

    expect(longer).toEqual(['banana', 'cherry']);
    expect(shorter).toEqual(['apple', 'date']);
  });

  it('should handle an empty array', () => {
    const arr: number[] = [];
    const [evens, odds] = partition(arr, (num) => num % 2 === 0);

    expect(evens).toEqual([]);
    expect(odds).toEqual([]);
  });

  it('should partition an array of objects based on a predicate', () => {
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
