import { bench, describe } from 'vitest';
import { findLastKey } from '.';
import { findLastKey as findLastKeyLodash } from 'lodash-es';

describe('findLastKey', () => {
  const obj = {
    bike: { active: true },
    car: { active: false },
    plane: { active: true },
  };

  bench('modern-kit/findLastKey', () => {
    findLastKey(obj, (item) => item.active);
  });

  bench('lodash/findLastKey', () => {
    findLastKeyLodash(obj, (item) => item.active);
  });
});
