import { bench, describe } from 'vitest';
import { flattenDeep as flattenDeepLodash } from 'lodash-es';
import { flattenDeep } from '.';

const createNestedArray = (values: any[]) => {
  if (values.length === 0) {
    return [];
  }
  const [first, ...rest] = values;
  return [first, createNestedArray(rest)];
};

describe('flattenDeep', () => {
  const arr = createNestedArray(
    Array.from({ length: 30 }, (_, index) => index)
  );

  bench('modern-kit/flattenDeep', () => {
    flattenDeep(arr);
  });

  bench('lodash/flattenDeep', () => {
    flattenDeepLodash(arr);
  });

  bench('js built-in/flat(Infinity)', () => {
    arr.flat(Infinity);
  });
});
