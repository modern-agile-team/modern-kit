import { bench, describe } from 'vitest';
import { inRange as inRangeLodash } from 'lodash-es';
import { isInRange } from '.';

describe('isInRange', () => {
  bench('@modern-kit/isInRange', () => {
    isInRange({ value: 10, min: 0, max: 10 });
  });

  bench('lodash/inRange', () => {
    inRangeLodash(10, 0, 10);
  });
});
