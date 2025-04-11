import { bench, describe } from 'vitest';
import { clamp } from '.';
import { clamp as clampLodash } from 'lodash-es';

describe('clamp', () => {
  bench('modern-kit/clamp', () => {
    clamp(7, 0, 10);
  });

  bench('lodash/clamp', () => {
    clampLodash(7, 0, 10);
  });
});
