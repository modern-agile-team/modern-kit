import { bench, describe } from 'vitest';
import { pick } from '.';
import { pick as pickLodash } from 'lodash-es';

describe('pick', () => {
  bench('@modern-kit/pick', () => {
    pick({ a: 1, b: 2, c: 3, d: 4, e: 5 }, ['a', 'c', 'e']);
  });

  bench('lodash/pick', () => {
    pickLodash({ a: 1, b: 2, c: 3, d: 4, e: 5 }, ['a', 'c', 'e']);
  });
});
