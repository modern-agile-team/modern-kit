import { bench, describe } from 'vitest';
import { cloneDeep as cloneDeep } from '.';
import { cloneDeep as cloneDeepLodash } from 'lodash-es';

describe('cloneDeep', () => {
  bench('@modern-kit/cloneDeep', () => {
    cloneDeep({ a: 1, b: 2, c: { d: 4, e: [1, 2, 3] } });
  });

  bench('lodash/cloneDeep', () => {
    cloneDeepLodash({ a: 1, b: 2, c: { d: 4, e: [1, 2, 3] } });
  });
});
