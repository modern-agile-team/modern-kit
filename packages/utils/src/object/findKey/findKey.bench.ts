import { bench, describe } from 'vitest';
import { findKey } from '.';
import { findKey as findKeyLodash } from 'lodash-es';

describe('findKey', () => {
  const obj = {
    bike: { active: true },
    plane: { active: true },
    car: { active: false },
  };

  bench('modern-kit/findKey', () => {
    findKey(obj, (item) => item.active);
  });

  bench('lodash/findKey', () => {
    findKeyLodash(obj, (item) => item.active);
  });
});