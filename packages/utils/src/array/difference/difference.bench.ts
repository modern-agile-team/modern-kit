import { bench, describe } from 'vitest';
import { differenceBy as differenceByLodash } from 'lodash-es';
import { difference } from '.';

const createTestArr = (length: number) => {
  return Array.from({ length }, () => ({
    id: Math.floor(Math.random() * 10),
  }));
};

describe('difference', () => {
  const arr1 = createTestArr(20);
  const arr2 = createTestArr(10);

  bench('modern-kit/difference', () => {
    difference(arr1, arr2, (item) => item.id);
  });

  bench('lodash/differenceBy', () => {
    differenceByLodash(arr1, arr2, (item) => item.id);
  });
});
