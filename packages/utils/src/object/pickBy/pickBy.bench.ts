import { bench, describe } from 'vitest';
import { pickBy } from '.';
import { pickBy as pickByLodash } from 'lodash-es';

describe('pickBy', () => {
  const obj = { a: 1, b: '', c: null, d: undefined, e: 'str' };

  bench('@modern-kit/pickBy', () => {
    pickBy(obj, (value) => !value);
  });

  bench('lodash/pickBy', () => {
    pickByLodash(obj, (value) => !value);
  });
});
