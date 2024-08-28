import { bench, describe } from 'vitest';
import { compact as compactLodash } from 'lodash-es';
import { compact } from '.';

describe('compact', () => {
  const arr = [1, 2, 3, '1', '2', '3', true, false, NaN, null, undefined];

  bench('modern-kit/compact', () => {
    compact(arr);
  });

  bench('lodash/compact', () => {
    compactLodash(arr);
  });
});
