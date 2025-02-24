import { bench, describe } from 'vitest';
import { trimEnd as trimEndLodash } from 'lodash-es';
import { trimEnd } from '.';

describe('trimEnd', () => {
  bench('modern-kit/trimEnd', () => {
    trimEnd('abc   ');
    trimEnd('abc---', '-');
    trimEnd('abc+-*', '+-*');
  });

  bench('lodash/trimEnd', () => {
    trimEndLodash('abc   ');
    trimEndLodash('abc---', '-');
    trimEndLodash('abc+-*', '+-*');
  });
});
