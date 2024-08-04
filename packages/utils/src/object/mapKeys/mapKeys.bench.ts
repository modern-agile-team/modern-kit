import { bench, describe } from 'vitest';
import { mapKeys as mapKeysLodash } from 'lodash-es';
import { mapKeys } from '.';

const createObj = (depth: number) => {
  const obj = {} as Record<string, string>;
  for (let i = 0; i < depth; i++) {
    obj[`key${i}`] = `value${i}`;
  }
  return obj;
};

describe('mapKeys', () => {
  const obj = createObj(20);

  bench('modern-kit/mapKeys', () => {
    mapKeys(obj, ({ key, value }) => key + value);
  });

  bench('lodash/mapKeys', () => {
    mapKeysLodash(obj, (value, key) => key + value);
  });
});
