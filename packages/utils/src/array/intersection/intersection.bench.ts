import { bench, describe } from 'vitest';
import {
  intersectionBy as intersectionByLodash,
  intersection as intersectionLodash,
} from 'lodash-es';
import { intersection } from '.';

describe('intersection', () => {
  const arr1 = [1, 2, 3, 4];
  const arr2 = [1, 2, 4, 5];

  bench('modern-kit/intersection', () => {
    intersection(arr1, arr2); // [1, 2, 4]
  });

  bench('lodash/intersection', () => {
    intersectionLodash(arr1, arr2); // [1, 2, 4]
  });
});

describe('intersection with iteratee', () => {
  const arr1 = [
    { id: 1, name: 'john' },
    { id: 2, name: 'gromit' },
  ];
  const arr2 = [
    { id: 1, name: 'john' },
    { id: 3, name: 'dylan' },
  ];

  bench('modern-kit/intersection', () => {
    intersection(arr1, arr2, (item) => item.id);
  });

  bench('lodash/intersectionBy', () => {
    intersectionByLodash(arr1, arr2, (item) => item.id);
  });
});
