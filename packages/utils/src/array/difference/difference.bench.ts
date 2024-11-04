import { bench, describe } from 'vitest';
import {
  differenceBy as differenceByLodash,
  difference as differenceLodash,
} from 'lodash-es';
import { difference } from '.';

describe('difference', () => {
  const arr1 = [1, 2, 3, 4, 5];
  const arr2 = [2, 3, 4];
  bench('modern-kit/difference', () => {
    difference(arr1, arr2);
  });

  bench('lodash/difference', () => {
    differenceLodash(arr1, arr2);
  });
});

describe('difference with iteratee', () => {
  const arr1 = [
    { id: 1, name: 'john' },
    { id: 2, name: 'gromit' },
  ];
  const arr2 = [
    { id: 1, name: 'john' },
    { id: 3, name: 'dylan' },
  ];

  bench('modern-kit/difference', () => {
    difference(arr1, arr2, (item) => item.id);
  });

  bench('lodash/differenceBy', () => {
    differenceByLodash(arr1, arr2, (item) => item.id);
  });
});
