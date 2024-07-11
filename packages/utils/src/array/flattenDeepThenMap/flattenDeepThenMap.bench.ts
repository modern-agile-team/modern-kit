import { bench, describe } from 'vitest';
import { flattenDeep as flattenDeepLodash } from 'lodash-es';
import { flattenDeepThenMap } from '.';

const createNestedArray = (values: any[]) => {
  if (values.length === 0) {
    return [];
  }
  const [first, ...rest] = values;
  return [first, createNestedArray(rest)];
};

describe('flattenDeepThenMap', () => {
  const arr = createNestedArray(
    Array.from({ length: 30 }, (_, index) => index)
  );

  bench('modern-kit/flattenDeepThenMap', () => {
    flattenDeepThenMap(arr, (item) => ({ id: item }));
  });

  bench('lodash/flattenDeep.map', () => {
    flattenDeepLodash(arr).map((item) => ({ id: item }));
  });

  bench('js built-in/flat(Infinity).map', () => {
    arr.flat(Infinity).map((item: number) => ({ id: item }));
  });
});
