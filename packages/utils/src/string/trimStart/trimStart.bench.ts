import { bench, describe } from 'vitest';
import { trimStart as trimStartLodash } from 'lodash-es';
import { trimStart } from '.';

describe('trimStart', () => {
  bench('modern-kit/trimStart', () => {
    trimStart('   abc');
    trimStart('---abc', '-');
    trimStart('+-*abc', '+-*');
  });

  bench('lodash/trimStart', () => {
    trimStartLodash('   abc');
    trimStartLodash('---abc', '-');
    trimStartLodash('+-*abc', '+-*');
  });
});
