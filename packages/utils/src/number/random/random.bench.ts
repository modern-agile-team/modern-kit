import { bench, describe } from 'vitest';
import { random } from '.';
import { random as randomLodash } from 'lodash-es';

describe('clamp', () => {
  bench('modern-kit/random', () => {
    random(0, 100);
  });

  bench('lodash/random', () => {
    randomLodash(0, 100);
  });
});
