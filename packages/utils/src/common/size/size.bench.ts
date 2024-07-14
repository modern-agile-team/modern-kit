import { bench, describe } from 'vitest';
import { size as sizeLodash } from 'lodash-es';
import { size } from '.';

describe('size', () => {
  bench('modern-kit/size', () => {
    size('12345');
    size([1, 2, 3, 4, 5]);
    size(new Set([1, 2, 3, 4, 5]));
    size({ a: 1, b: 2, c: 3, d: 4, e: 5 });
  });

  bench('lodash/size', () => {
    sizeLodash('12345');
    sizeLodash([1, 2, 3, 4, 5]);
    sizeLodash(new Set([1, 2, 3, 4, 5]));
    sizeLodash({ a: 1, b: 2, c: 3, d: 4, e: 5 });
  });
});
