import { bench, describe } from 'vitest';
import { mapValues as mapValuesLodash } from 'lodash-es';
import { mapValues } from '.';

describe('mapValues', () => {
  bench('modern-kit/mapValues', () => {
    mapValues({ a: 1, b: 2, c: 3, d: 4 }, ({ value, key }) => key + value);
  });

  bench('lodash/mapValues', () => {
    mapValuesLodash({ a: 1, b: 2, c: 3, d: 4 }, (value, key) => key + value);
  });
});
