import { describe, expect, it } from 'vitest';
import { groupBy } from '.';

describe('groupBy', () => {
  it('주어진 key로 배열을 그룹화해야 합니다.', () => {
    const items = [
      { category: 'fruit', name: 'apple' },
      { category: 'fruit', name: 'banana' },
      { category: 'vegetable', name: 'carrot' },
      { category: 'fruit', name: 'pear' },
      { category: 'vegetable', name: 'broccoli' },
    ];

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

    expect(groupBy(items, (item) => item.category)).toEqual(expected);
  });

  it('빈 배열을 처리 할 수 있어야 합니다.', () => {
    const items: Array<Record<string, string>> = [];
    const expected = {};

    expect(groupBy(items, (item) => item.category)).toEqual(expected);
  });

  it('숫자 키를 그룹화해서 처리해야 합니다.', () => {
    const items = [
      { category: 1, name: 'apple' },
      { category: 2, name: 'banana' },
      { category: 1, name: 'carrot' },
      { category: 2, name: 'pear' },
    ];

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

    expect(groupBy(items, (item) => item.category)).toEqual(expected);
  });
});
