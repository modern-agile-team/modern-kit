import { bench, describe } from 'vitest';
import { mapKeys as mapKeysLodash } from 'lodash-es';
import { mapKeys } from '.';

describe('mapKeys', () => {
  bench('modern-kit/mapKeys', () => {
    mapKeys({ a: 1, b: 2, c: 3, d: 4 }, ({ key, value }) => key + value);
  });

  bench('lodash/mapKeys', () => {
    mapKeysLodash({ a: 1, b: 2, c: 3, d: 4 }, (value, key) => key + value);
  });
});
