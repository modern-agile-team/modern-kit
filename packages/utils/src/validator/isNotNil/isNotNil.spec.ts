import { describe, it, expect } from 'vitest';
import { isNotNil } from '.';

describe('isNotNil', () => {
  it('should return true for non-nullish values', () => {
    for (const el of [1, 'dasdsa', { foo: 'bar' }, () => {}, Symbol()]) {
      expect(isNotNil(el)).toBe(true);
    }
  });

  it('should return false for nullish values', () => {
    for (const el of [null, undefined]) {
      expect(isNotNil(el)).toBe(false);
    }
  });
});
