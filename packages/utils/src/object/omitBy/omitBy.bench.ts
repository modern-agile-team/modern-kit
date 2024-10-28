import { bench, describe } from 'vitest';
import { omitBy } from '.';
import { omitBy as omitByLodash } from 'lodash-es';

describe('omitBy', () => {
  const obj = { a: 1, b: '', c: null, d: undefined, e: 'str' };

  bench('@modern-kit/omitBy', () => {
    omitBy(obj, (value) => !value);
  });

  bench('lodash/omitBy', () => {
    omitByLodash(obj, (value) => !value);
  });
});
