import { pickFalsy } from '.';

describe('pickFalsy', () => {
  it('should return a correct value ', () => {
    const isValidValue = pickFalsy();

    expect(isValidValue(null)).toBe(true);
    expect(isValidValue(undefined)).toBe(true);
    expect(isValidValue(false)).toBe(true);

    expect(isValidValue(0)).toBe(false);
    expect(isValidValue(-0)).toBe(false);
    expect(isValidValue(NaN)).toBe(false);

    expect(isValidValue('')).toBe(false);
    expect(isValidValue([])).toBe(false);
    expect(isValidValue({})).toBe(false);
  });

  it('should return a correct value with number option', () => {
    const isValidValue = pickFalsy('number');

    expect(isValidValue(0)).toBe(true);
    expect(isValidValue(-0)).toBe(true);
    expect(isValidValue(NaN)).toBe(true);
  });

  it('should return a correct value with string option', () => {
    const isValidValue = pickFalsy('string');

    expect(isValidValue('')).toBe(true);
  });

  it('should return a correct value with array option', () => {
    const isValidValue = pickFalsy('array');

    expect(isValidValue([])).toBe(true);
  });

  it('should return a correct value with object option', () => {
    const isValidValue = pickFalsy('object');

    expect(isValidValue({})).toBe(true);
  });

  it('should return a correct value with multiple option', () => {
    const isValidValue = pickFalsy('string', 'object', 'array');

    expect(isValidValue([])).toBe(true);
    expect(isValidValue({})).toBe(true);
  });
});
