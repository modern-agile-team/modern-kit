import { bench, describe } from 'vitest';
import { nth as nthLodash } from 'lodash-es';
import { at } from '.';

describe('at', () => {
  const arr = [1, 2, 3, 4];

  bench('modern-kit/at', () => {
    at(arr, 0);
    at(arr, 1);
    at(arr, 2);
    at(arr, 3);
  });

  bench('lodash/nth', () => {
    nthLodash(arr, 0);
    nthLodash(arr, 1);
    nthLodash(arr, 2);
    nthLodash(arr, 3);
  });

  bench('js built-in/att', () => {
    arr.at(0);
    arr.at(1);
    arr.at(2);
    arr.at(3);
  });
});
