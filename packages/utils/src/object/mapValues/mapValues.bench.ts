import { bench, describe } from 'vitest';
import { mapValues as mapValuesLodash } from 'lodash-es';
import { mapValues } from '.';
describe('mapValues', () => {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
  };

  const iteratee = ({ value }: { key: PropertyKey; value: number }): number =>
    value;

  bench('modern-kit/mapValues', () => {
    mapValues(obj, iteratee);
  });

  bench('lodash/mapValues', () => {
    mapValuesLodash(obj, iteratee);
  });
});
