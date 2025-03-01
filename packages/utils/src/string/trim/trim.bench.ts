import { bench, describe } from 'vitest';
import { trim as trimLodash } from 'lodash-es';
import { trim } from '.';

describe('trim', () => {
  bench('modern-kit/trim', () => {
    trim('   abc   ');
    trim('---abc---', '-');
    trim('+-*abc+-*', '+-*');
  });

  bench('lodash/trim', () => {
    trimLodash('   abc   ');
    trimLodash('---abc---', '-');
    trimLodash('+-*abc+-*', '+-*');
  });
});
