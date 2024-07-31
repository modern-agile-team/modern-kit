import { describe, it, expect } from 'vitest';
import { isFunction } from '.';

describe('isFunction', () => {
  it('should return true for arrow function', () => {
    expect(isFunction(() => {})).toBe(true);
  });

  it('should return true for anonymous function', () => {
    expect(isFunction(function () {})).toBe(true);
  });

  it('should return true for named function', () => {
    expect(isFunction(function namedFunction() {})).toBe(true);
  });

  it('should return true for class method', () => {
    class MyClass {
      method() {}
    }
    expect(isFunction(new MyClass().method)).toBe(true);
  });

  it('should return true for Function constructor', () => {
    expect(isFunction(new Function())).toBe(true);
  });

  it('should return false for object', () => {
    expect(isFunction({})).toBe(false);
  });

  it('should return false for number', () => {
    expect(isFunction(123)).toBe(false);
  });

  it('should return false for string', () => {
    expect(isFunction('test')).toBe(false);
  });

  it('should return false for boolean', () => {
    expect(isFunction(true)).toBe(false);
  });

  it('should return false for array', () => {
    expect(isFunction([])).toBe(false);
  });

  it('should return false for null', () => {
    expect(isFunction(null)).toBe(false);
  });

  it('should return false for undefined', () => {
    expect(isFunction(undefined)).toBe(false);
  });
});
