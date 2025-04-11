import { bench, describe } from 'vitest';
import { range as rangeLodash } from 'lodash-es';
import { range } from '.';

describe('range', () => {
  bench('modern-kit/range', () => {
    range(50);
    range(10, 50);
    range(10, 50, 3);
  });

  bench('lodash/range', () => {
    rangeLodash(50);
    rangeLodash(10, 50);
    rangeLodash(10, 50, 3);
  });
});
