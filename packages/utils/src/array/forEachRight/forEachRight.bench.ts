import { bench, describe } from 'vitest';
import { forEachRight as forEachRightLodash } from 'lodash-es';
import { forEachRight } from '.';

describe('forEachRight', () => {
  const arr = Array.from({ length: 30 }, (_, index) => index);

  bench('modern-kit/forEachRight', () => {
    forEachRight(arr, (item) => item);
  });

  bench('lodash/forEachRight', () => {
    forEachRightLodash(arr, (item) => item);
  });
});
