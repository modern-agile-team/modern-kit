import { bench, describe } from 'vitest';
import { invert as invertLodash, invertBy as invertByLodash } from 'lodash-es';
import { invert } from '.';

describe('invert', () => {
  const obj = { a: 1, b: 2, c: 3, d: 4 };

  bench('modern-kit/invert', () => {
    invert(obj); // { 1: 'a', 2: 'b', 3: 'c', 4: 'd' }
  });

  bench('lodash/invert', () => {
    invertLodash(obj); // { 1: 'a', 2: 'b', 3: 'c', 4: 'd' }
  });
});

describe('invert with iteratee', () => {
  const obj = { a: 1, b: 2, c: 3, d: 4 };

  bench('modern-kit/invert', () => {
    invert(obj, ({ value }) => `key_${value}`); // { key_1: 'a', key_2: 'b', key_3: 'c', key_4: 'd' }
  });

  bench('lodash/invertBy', () => {
    invertByLodash(obj, (value) => `key_${value}`); // { key_1: 'a', key_2: 'b', key_3: 'c', key_4: 'd' }
  });
});
