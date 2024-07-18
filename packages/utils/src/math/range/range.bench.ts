import { bench, describe } from 'vitest';
import { range as rangeLodash } from 'lodash-es';
import { range } from '.';

describe('range', () => {
  bench('modern-kit/range', () => {
    range(1, 100);
  });

  bench('lodash/range', () => {
    rangeLodash(1, 100);
  });
});
