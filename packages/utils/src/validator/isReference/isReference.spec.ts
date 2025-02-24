import { describe, it, expect } from 'vitest';
import { isReference } from '.';

describe('isReference', () => {
  it('참조 타입인 경우 true를 반환해야 합니다.', () => {
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

  it('원시 타입인 경우 false를 반환해야 합니다.', () => {
    expect(isReference(null)).toBe(false);
    expect(isReference(undefined)).toBe(false);
    expect(isReference('string')).toBe(false);
    expect(isReference(false)).toBe(false);
    expect(isReference(1)).toBe(false);
    expect(isReference(Symbol())).toBe(false);
  });
});
