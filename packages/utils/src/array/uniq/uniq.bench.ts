import { bench, describe } from 'vitest';
import { uniq as uniqLodash, uniqBy as uniqByLodash } from 'lodash-es';
import { uniq } from '.';

describe('uniq', () => {
  const arr = [1, 2, 2, 3, 2, 3];

  bench('@modern-kit/uniq', () => {
    uniq(arr); // [1, 2, 3]
  });

  bench('lodash/uniq', () => {
    uniqLodash(arr); // [1, 2, 3]
  });
});

describe('uniq with iteratee', () => {
  const arr = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 2 }, { id: 3 }];

  bench('@modern-kit/uniq', () => {
    uniq(arr, (item) => item.id); // [{ id: 1 }, { id: 2 }, { id: 3 }]
  });

  bench('lodash/uniqBy', () => {
    uniqByLodash(arr, (item) => item.id); // [{ id: 1 }, { id: 2 }, { id: 3 }]
  });
});
