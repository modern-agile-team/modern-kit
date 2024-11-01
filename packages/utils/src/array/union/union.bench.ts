import { bench, describe } from 'vitest';
import { union as unionLodash, unionBy as unionByLodash } from 'lodash-es';
import { union } from '.';

describe('union', () => {
  const arr1 = [1, 2, 3, 4];
  const arr2 = [1, 2, 4, 5];

  bench('@modern-kit/union', () => {
    union(arr1, arr2); // [1, 2, 3, 4, 5]
  });

  bench('lodash/union', () => {
    unionLodash(arr1, arr2); // [1, 2, 3, 4, 5]
  });
});

describe('union with iteratee', () => {
  const arr1 = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
  const arr2 = [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }];

  bench('@modern-kit/union', () => {
    union(arr1, arr2, (item) => item.id); // [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
  });

  bench('lodash/unionBy', () => {
    unionByLodash(arr1, arr2, (item) => item.id); // [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]
  });
});
