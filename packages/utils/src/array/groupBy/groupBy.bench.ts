import { bench, describe } from 'vitest';
import { groupBy } from '.';
import { groupBy as groupByLodash } from 'lodash-es';

describe('groupBy', () => {
  const array = [
    { category: 'fruit', name: 'apple' },
    { category: 'fruit', name: 'banana' },
    { category: 'vegetable', name: 'carrot' },
    { category: 'fruit', name: 'pear' },
    { category: 'vegetable', name: 'broccoli' },
  ];

  bench('modern-kit/groupBy', () => {
    groupBy(array, (item) => item.category);
  });

  bench('lodash/groupBy', () => {
    groupByLodash(array, (item) => item.category);
  });
});
