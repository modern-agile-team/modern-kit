import { bench, describe } from 'vitest';
import { flattenDepth as flattenDepthLodash } from 'lodash-es';
import { flatten } from '.';

describe('flatten', () => {
  const arr = [1, [3, [5, [7, [9, [10, [20, [21]]]], 11], 12], 13], 14, 15];

  bench('modern-kit/flatten', () => {
    flatten(arr, 3);
  });

  bench('lodash/flattenDepth', () => {
    flattenDepthLodash(arr, 3);
  });

  bench('js built-in/flat', () => {
    arr.flat(3);
  });
});
