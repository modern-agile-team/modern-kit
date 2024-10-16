import { bench, describe } from 'vitest';
import { omit } from '.';
import { omit as omitLodash } from 'lodash-es';

describe('omit', () => {
  bench('modern-kit/omit', () => {
    omit({ a: 1, b: 2, c: 3, d: 4, e: 5 }, ['a', 'c', 'e']);
  });

  bench('lodash/omit', () => {
    omitLodash({ a: 1, b: 2, c: 3, d: 4, e: 5 }, ['a', 'c', 'e']);
  });
});
