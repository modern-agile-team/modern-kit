import { isPlainObject } from '.';

describe('isPlainObject', () => {
  it('should return true for the plain object.', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(new Object())).toBe(true);
  });

  it('should return false for non plain object', () => {
    expect(isPlainObject(function () {})).toBe(false);
    expect(isPlainObject(() => {})).toBe(false);
    expect(isPlainObject([])).toBe(false);
    expect(isPlainObject(new Set())).toBe(false);
    expect(isPlainObject(new Map())).toBe(false);
    expect(isPlainObject(null)).toBe(false);
    expect(isPlainObject(undefined)).toBe(false);
    expect(isPlainObject(1)).toBe(false);
    expect(isPlainObject('')).toBe(false);
    expect(isPlainObject(false)).toBe(false);
    expect(isPlainObject(Symbol())).toBe(false);
    expect(isPlainObject(new Date())).toBe(false);
  });
});
