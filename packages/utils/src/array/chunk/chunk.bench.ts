import { bench, describe } from 'vitest';
import { chunk as chunkLodash } from 'lodash-es';
import { chunk } from '.';

describe('chunk', () => {
  const arr = Array.from({ length: 20 }, (_, idx) => idx);

  bench('modern-kit/chunk', () => {
    chunk(arr, 4);
  });

  bench('lodash/chunk', () => {
    chunkLodash(arr, 4);
  });
});
