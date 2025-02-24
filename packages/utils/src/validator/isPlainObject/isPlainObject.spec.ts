import { describe, it, expect } from 'vitest';
import { isPlainObject } from '.';

describe('isPlainObject', () => {
  it('일반 객체인 경우 true를 반환해야 합니다.', () => {
    expect(isPlainObject({})).toBe(true);
    expect(isPlainObject(new Object())).toBe(true);
    expect(isPlainObject(Object.create({}))).toBe(true);
    expect(isPlainObject(Object.create(null))).toBe(true);
  });

  it('일반 객체가 아닌 경우 false를 반환해야 합니다.', () => {
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
