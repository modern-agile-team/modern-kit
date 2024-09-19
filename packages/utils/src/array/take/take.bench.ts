import { bench, describe } from 'vitest';
import { take as takeLodash } from 'lodash-es';
import { take } from '.';

describe('take', () => {
  bench('modern-kit/take', () => {
    take([1, 2, 3]);
    take([1, 2, 3], 0);
    take([1, 2, 3], 2);
    take([1, 2, 3], 4);
  });

  bench('lodash/take', () => {
    takeLodash([1, 2, 3]);
    takeLodash([1, 2, 3], 0);
    takeLodash([1, 2, 3], 2);
    takeLodash([1, 2, 3], 4);
  });
});
