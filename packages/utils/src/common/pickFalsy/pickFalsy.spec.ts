import { describe, it, expect } from 'vitest';
import { pickFalsy } from '.';

describe('pickFalsy', () => {
  it('should return a correct value ', () => {
    const isValidValue = pickFalsy();

    expect(isValidValue(null)).toBeTruthy();
    expect(isValidValue(undefined)).toBeTruthy();
    expect(isValidValue(false)).toBeTruthy();

    expect(isValidValue(0)).toBeFalsy();
    expect(isValidValue(-0)).toBeFalsy();
    expect(isValidValue(NaN)).toBeFalsy();

    expect(isValidValue('')).toBeFalsy();
    expect(isValidValue([])).toBeFalsy();
    expect(isValidValue({})).toBeFalsy();
  });

  it('should return a correct value with number option', () => {
    const isValidValue = pickFalsy('number');

    expect(isValidValue(0)).toBeTruthy();
    expect(isValidValue(-0)).toBeTruthy();
    expect(isValidValue(NaN)).toBeTruthy();
  });

  it('should return a correct value with string option', () => {
    const isValidValue = pickFalsy('string');

    expect(isValidValue('')).toBeTruthy();
  });

  it('should return a correct value with array option', () => {
    const isValidValue = pickFalsy('array');

    expect(isValidValue([])).toBeTruthy();
  });

  it('should return a correct value with object option', () => {
    const isValidValue = pickFalsy('object');

    expect(isValidValue({})).toBeTruthy();
  });

  it('should return a correct value with multiple option', () => {
    const isValidValue = pickFalsy('string', 'object', 'array');

    expect(isValidValue([])).toBeTruthy();
    expect(isValidValue({})).toBeTruthy();
  });
});
