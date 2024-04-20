import { describe, it, expect } from 'vitest';
import { isNullish } from '.';

describe('isNotNullish', () => {
  it('should return false for non-nullish values', () => {
    for (const el of [1, 'dasdsa', { foo: 'bar' }, () => {}, Symbol()]) {
      expect(isNullish(el)).toBe(false);
    }
  });

  it('should return true for nullish values', () => {
    for (const el of [null, undefined]) {
      expect(isNullish(el)).toBe(true);
    }
  });
});
