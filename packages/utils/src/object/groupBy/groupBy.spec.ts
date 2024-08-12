import { describe, expect, it } from 'vitest';
import { groupBy } from '.';

describe('groupBy', () => {
  it('should group elements by a given key', () => {
    const items = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'pear' },
      { category: 'vegetable', name: 'broccoli' },
    ];

    const actual = groupBy(items, (item) => item.category);
    const expected = {
      fruit: [
        { category: 'fruit', name: 'apple' },
        { category: 'fruit', name: 'banana' },
        { category: 'fruit', name: 'pear' },
      ],
      vegetable: [
        { category: 'vegetable', name: 'carrot' },
        { category: 'vegetable', name: 'broccoli' },
      ],
    };

    expect(actual).toEqual(expected);
  });

  it('should handle an empty array', () => {
    const items: Array<Record<string, string>> = [];

    const actual = groupBy(items, (item) => item.category);
    const expected = {};

    expect(actual).toEqual(expected);
  });

  it('should group handle numeric key', () => {
    const items = [
      { category: 1, name: 'apple' },
      { category: 2, name: 'banana' },
      { category: 1, name: 'carrot' },
      { category: 2, name: 'pear' },
    ];

    const actual = groupBy(items, (item) => item.category);
    const expected = {
      '1': [
        { category: 1, name: 'apple' },
        { category: 1, name: 'carrot' },
      ],
      '2': [
        { category: 2, name: 'banana' },
        { category: 2, name: 'pear' },
      ],
    };

    expect(actual).toEqual(expected);
  });

  it('should group handle symbol key', () => {
    const symbolA = Symbol('A');
    const symbolB = Symbol('B');

    const items = [
      { category: symbolA, name: 'apple' },
      { category: symbolB, name: 'banana' },
      { category: symbolA, name: 'carrot' },
      { category: symbolB, name: 'pear' },
    ];

    const actual = groupBy(items, (item) => item.category);
    const expected = {
      [symbolA]: [
        { category: symbolA, name: 'apple' },
        { category: symbolA, name: 'carrot' },
      ],
      [symbolB]: [
        { category: symbolB, name: 'banana' },
        { category: symbolB, name: 'pear' },
      ],
    };

    expect(actual).toEqual(expected);
  });
});
