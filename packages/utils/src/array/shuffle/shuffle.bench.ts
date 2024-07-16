import { bench, describe } from 'vitest';
import { shuffle as shuffleLodash } from 'lodash-es';
import { shuffle } from '.';

describe('shuffle', () => {
  const arr = Array.from({ length: 30 }, (_, index) => index);

  bench('modern-kit/shuffle', () => {
    shuffle(arr);
  });

  bench('lodash/shuffle', () => {
    shuffleLodash(arr);
  });
});
