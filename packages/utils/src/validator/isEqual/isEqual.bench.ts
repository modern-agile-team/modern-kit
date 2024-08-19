import { bench, describe } from 'vitest';
import { isEqual as isEqualLodash } from 'lodash-es';
import { isEqual } from '.';

describe('isEqual', () => {
  const obj = {
    a: 1,
    b: [1, 2, 3],
    c: {
      d: () => 1,
      e: '1',
    },
    f: {
      g: [4, 5, 6],
    },
  };

  bench('modern-kit/isEqual', () => {
    isEqual(obj, obj);
  });

  bench('lodash/isEqual', () => {
    isEqualLodash(obj, obj);
  });
});
