import { bench, describe } from 'vitest';
import { sum } from '.';
import { sum as sumLodash, sumBy as sumByLodash } from 'lodash-es';

describe('sum', () => {
  bench('modern-kit/sum', () => {
    sum([1, 2, 3, 4, 5]);
  });

  bench('lodash/sum', () => {
    sumLodash([1, 2, 3, 4, 5]);
  });
});

describe('sumBy', () => {
  bench('modern-kit/sum with iteratee', () => {
    sum([{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }], (item) => item.a);
  });

  bench('lodash/sumBy', () => {
    sumByLodash(
      [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 4 }, { a: 5 }],
      (item) => item.a
    );
  });
});
