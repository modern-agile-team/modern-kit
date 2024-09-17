import { bench, describe } from 'vitest';
import { drop as dropLodash } from 'lodash-es';
import { drop } from '.';

describe('drop', () => {
  bench('modern-kit/drop', () => {
    drop([1, 2, 3]);
    drop([1, 2, 3], 2);
    drop([1, 2, 3], 4);
    drop([1, 2, 3], 0);
  });

  bench('lodash/drop', () => {
    dropLodash([1, 2, 3]);
    dropLodash([1, 2, 3], 2);
    dropLodash([1, 2, 3], 4);
    dropLodash([1, 2, 3], 0);
  });
});
