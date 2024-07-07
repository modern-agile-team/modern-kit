import { bench, describe } from 'vitest';
import { intersectionBy as intersectionByLodash } from 'lodash-es';
import { intersection } from '.';

const createTestArr = () => {
  return Array.from({ length: 50 }, () => ({
    id: Math.floor(Math.random() * 10),
  }));
};

describe('intersection', () => {
  const arr1 = createTestArr();
  const arr2 = createTestArr();

  bench('modern-kit/intersection', () => {
    intersection(arr1, arr2, (item) => item.id);
  });

  bench('lodash/intersectionBy', () => {
    intersectionByLodash(arr1, arr2, 'id');
  });
});
