import { bench, describe } from 'vitest';
import { mapValues as mapValuesLodash } from 'lodash-es';
import { mapValues } from '.';

const createObj = (depth: number) => {
  const obj = {} as Record<string, string>;
  for (let i = 0; i < depth; i++) {
    obj[`key${i}`] = `value${i}`;
  }
  return obj;
};

describe('mapValues', () => {
  const obj = createObj(30);

  bench('modern-kit/mapValues', () => {
    mapValues(obj, ({ value, key }) => key + value);
  });

  bench('lodash/mapValues', () => {
    mapValuesLodash(obj, (value, key) => key + value);
  });
});
