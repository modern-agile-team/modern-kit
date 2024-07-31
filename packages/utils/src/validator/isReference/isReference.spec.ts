import { describe, it, expect } from 'vitest';
import { isReference } from '.';

describe('isReference', () => {
  it('should return true for reference types', () => {
    expect(isReference({})).toBe(true);
    expect(isReference([])).toBe(true);
    expect(isReference(new Set())).toBe(true);
    expect(isReference(new Map())).toBe(true);
    expect(isReference(new WeakSet())).toBe(true);
    expect(isReference(new WeakMap())).toBe(true);
    expect(isReference(new Date())).toBe(true);
    expect(isReference(new Error())).toBe(true);
    expect(isReference(() => {})).toBe(true);
  });

  it('should return false for primitive types', () => {
    expect(isReference(null)).toBe(false);
    expect(isReference(undefined)).toBe(false);
    expect(isReference('string')).toBe(false);
    expect(isReference(false)).toBe(false);
    expect(isReference(1)).toBe(false);
    expect(isReference(Symbol())).toBe(false);
  });
});
