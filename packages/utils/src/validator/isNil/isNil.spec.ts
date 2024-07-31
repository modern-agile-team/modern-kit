import { describe, it, expect } from 'vitest';
import { isNil } from '.';

describe('isNil', () => {
  it('should return false for non-nullish values', () => {
    for (const el of [1, 'dasdsa', { foo: 'bar' }, () => {}, Symbol()]) {
      expect(isNil(el)).toBe(false);
    }
  });

  it('should return true for nullish values', () => {
    for (const el of [null, undefined]) {
      expect(isNil(el)).toBe(true);
    }
  });
});
