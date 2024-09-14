import { bench, describe } from 'vitest';
import { fill as fillLoadsh } from 'lodash-es';
import { fill } from '.';

describe('fill', () => {
  bench('modern-kit/fill', () => {
    fill([1, 2, 3], 0);
    fill([1, 2, 3], 0, 1);
    fill([1, 2, 3], 0, 1, 2);
  });

  bench('lodash/fill', () => {
    fillLoadsh([1, 2, 3], 0);
    fillLoadsh([1, 2, 3], 0, 1);
    fillLoadsh([1, 2, 3], 0, 1, 2);
  });

  bench('native/fill', () => {
    [1, 2, 3].fill(0);
    [1, 2, 3].fill(0, 1);
    [1, 2, 3].fill(0, 1, 2);
  });
});
