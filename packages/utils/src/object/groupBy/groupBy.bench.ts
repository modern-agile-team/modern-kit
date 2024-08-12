import { bench, describe } from 'vitest';
import { groupBy } from '.';
import { groupBy as groupByLodash } from 'lodash-es';

describe('groupBy', () => {
  const obj = Array.from({ length: 10000 }, () => {
    return { category: 'fruit', name: 'apple' };
  });

  bench('modern-kit/groupBy', () => {
    groupBy(obj, (item) => item.category);
  });

  bench('lodash/groupBy', () => {
    groupByLodash(obj, (item) => item.category);
  });
});
